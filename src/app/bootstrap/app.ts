import { handleRequest } from '../provider/routeProvider'

import '../provider/appProvider'
await import('../routes/api')

export const GET = handleRequest
export const POST = handleRequest
export const PUT = handleRequest
export const DELETE = handleRequest
