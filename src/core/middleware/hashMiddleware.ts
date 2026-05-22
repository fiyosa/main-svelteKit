import { hashLib } from '$lib'
import { registerMiddleware, type ApiEvent } from '../provider/routeProvider'

export const hashMiddleware = async (event: ApiEvent) => {
  const params = event.params as Record<string, string>

  for (const key in params) {
    const originalValue = params[key]
    if (originalValue) {
      const decodedValue = hashLib.decodeId(originalValue)
      if (decodedValue !== '') {
        params[key] = decodedValue
      }
    }
  }
}

registerMiddleware('hash', hashMiddleware)
