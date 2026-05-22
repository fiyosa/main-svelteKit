import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit'
import { checkPolicy } from './authProvider'
import t from '$lang/lang'

export type ApiEvent = RequestEvent<Record<string, string>> & { user_id?: any; body?: any }
export type Handler = (event: ApiEvent) => Promise<Response> | Response
export type Middleware = (event: ApiEvent) => Promise<Response | void> | Response | void

export interface RouteDef {
  method: string
  pattern: RegExp
  handler: Handler
  middlewares: string[]
  policies: string[]
}

const routes: RouteDef[] = []
const middlewareRegistry: Record<string, Middleware> = {}

export function clearRoutes() {
  routes.length = 0
}

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
    policies: [],
  }

  routes.push(route)

  const chain = {
    middleware: (name: string) => {
      route.middlewares.push(name)
      return chain
    },
    policy: (permission: string) => {
      route.policies.push(permission)
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

export const handleRequest: RequestHandler = async (event: ApiEvent) => {
  const method = event.request.method
  const params = event.params as Record<string, string>
  const path = params.path || ''

  // Automate Body Extraction
  const contentType = event.request.headers.get('content-type') || ''
  if (method !== 'GET' && method !== 'DELETE') {
    try {
      if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
        const formData = await event.request.formData()
        event.body = Object.fromEntries(formData.entries())
      } else {
        event.body = await event.request.json()
      }
    } catch (err) {
      event.body = {}
    }
  }

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

        // Execute Policies
        for (const permission of route.policies) {
          const isAllowed = await checkPolicy(event, permission)
          if (!isAllowed) {
            return json({ message: t._('forbidden') }, { status: 403 })
          }
        }

        return route.handler(event)
      }
    }
  }

  return json({ message: t._('endpoint_not_found') }, { status: 404 })
}

if (import.meta.hot) {
  import.meta.hot.accept()
  import.meta.hot.dispose(() => {
    routes.length = 0
  })
}
