import { ApolloServer } from '@apollo/server'
import { typeDefs, resolvers } from '$lib/server/graphql/schema'
import type { RequestHandler } from './$types'

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
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

  const response = await server.executeHTTPGraphQLRequest({
    httpGraphQLRequest: {
      method: request.method,
      headers: new Map(request.headers) as any,
      search: new URL(request.url).search,
      body: body,
    },
    context: async () => ({ event }),
  })

  const bodyContent = response.body.kind === 'complete' ? response.body.string : ''

  return new Response(bodyContent, {
    status: response.status ?? 200,
    headers: new Headers(response.headers as unknown as Record<string, string>),
  })
}

export const GET = handler
export const POST = handler
