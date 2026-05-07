import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { secret } from '$config/secret'
import * as schema from './schema'
import logger from '$lib/server/logger'

const customLogger = {
  logQuery: (query: string, params: any[]) => {
    const formattedQuery = params.reduce((acc, param, index) => {
      const safeParam = JSON.stringify(param).replace(/^"|"$/g, "'")
      return acc.replace(`$${index + 1}`, safeParam)
    }, query)
    logger.file.info(formattedQuery)
  },
}

export const db = drizzle({
  client: postgres(secret.server.DB_URL),
  schema,
  logger: secret.server.APP_ENV === 'development' && customLogger,
})
