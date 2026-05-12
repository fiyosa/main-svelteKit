import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit'

export type ApiEvent = RequestEvent<Record<string, string>> & { user?: any }
export type Handler = (event: ApiEvent) => Promise<Response> | Response
export type Middleware = (event: ApiEvent) => Promise<Response | void> | Response | void

export interface RouteDef {
  method: string
  pattern: RegExp
  handler: Handler
  middlewares: string[]
}

const routes: RouteDef[] = []
const middlewareRegistry: Record<string, Middleware> = {}

export function registerMiddleware(name: string, middleware: Middleware) {
  middlewareRegistry[name] = middleware
}

function register(method: string, path: string, handler: Handler) {
  let regexStr = path.replace(/\{([^\}]+)\}/g, '(?<$1>[^/]+)').replace(/:([^\/]+)/g, '(?<$1>[^/]+)')

  regexStr = `^${regexStr}/?$`

  const route: RouteDef = {
    method,
    pattern: new RegExp(regexStr),
    handler,
    middlewares: [],
  }

  routes.push(route)

  const chain = {
    middleware: (name: string) => {
      route.middlewares.push(name)
      return chain
    },
  }

  return chain
}

export const Route = {
  get: (path: string, handler: Handler) => register('GET', path, handler),
  post: (path: string, handler: Handler) => register('POST', path, handler),
  put: (path: string, handler: Handler) => register('PUT', path, handler),
  delete: (path: string, handler: Handler) => register('DELETE', path, handler),
}

export const handleRequest: RequestHandler = async (event) => {
  const method = event.request.method
  const params = event.params as Record<string, string>
  const path = params.path || ''

  for (const route of routes) {
    if (route.method === method) {
      const match = path.match(route.pattern)
      if (match) {
        Object.assign(params, match.groups)

        // Execute Middlewares
        for (const middlewareName of route.middlewares) {
          const middleware = middlewareRegistry[middlewareName]
          if (middleware) {
            const response = await middleware(event)
            if (response instanceof Response) {
              return response
            }
          }
        }

        return route.handler(event)
      }
    }
  }

  return json({ message: 'Endpoint Not Found' }, { status: 404 })
}
