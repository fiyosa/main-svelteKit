import { ApolloServer } from '@apollo/server'
import { typeDefs, resolvers } from '$lib/server/graphql/schema'
import type { RequestHandler } from './$types'
import { secret } from '$config/secret'
import { zod } from '$lib/public'
import { appProvider } from '$lib/server/graphql/provider/appProvider'
// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  includeStacktraceInErrorResponses: secret.server.APP_ENV === 'development',
  formatError: (formattedError, error: any) => {
    // 1. Tangkap ZodError dari resolver
    const originalError = error?.originalError
    if (originalError instanceof zod.ZodError) {
      return {
        ...formattedError,
        message: 'Validation failed',
        extensions: {
          ...formattedError.extensions,
          code: 'BAD_USER_INPUT',
          validationErrors: originalError.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
      }
    }

    // 2. Format ulang error BAD_USER_INPUT bawaan GraphQL
    if (formattedError.extensions?.code === 'BAD_USER_INPUT') {
      return {
        ...formattedError,
        message: 'Input tidak valid atau tidak sesuai skema',
      }
    }

    return formattedError
  },
})

let serverPromise: Promise<void> | null = null

const startServer = async () => {
  if (!serverPromise) serverPromise = server.start()

  return serverPromise
}

const handler: RequestHandler = async (event) => {
  const { request } = event
  await startServer()

  let body
  if (request.method === 'POST') {
    try {
      body = await request.json()
    } catch {
      body = {}
    }
  }

  let httpStatus = 200

  const response = await server.executeHTTPGraphQLRequest({
    httpGraphQLRequest: {
      method: request.method,
      headers: new Map(request.headers) as any,
      search: new URL(request.url).search,
      body: body,
    },
    context: async () => {
      const providerContext = await appProvider(event)
      return {
        ...providerContext,
        setHttpStatus: (code: number) => {
          httpStatus = code
        },
      }
    },
  })

  const bodyContent = response.body.kind === 'complete' ? response.body.string : ''

  return new Response(bodyContent, {
    status: httpStatus || (response.status ?? 200),
    headers: new Headers(response.headers as unknown as Record<string, string>),
  })
}

export const GET = handler
export const POST = handler
