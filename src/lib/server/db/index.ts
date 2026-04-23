import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { secret } from '$config/secret'
import * as schema from './schema'
import logger from '$lib/server/logger'

export const db = drizzle({
  client: postgres(secret.server.DB_URL),
  schema,
  logger: secret.server.APP_ENV === 'development' && {
    logQuery(query, params) {
      logger.file.info({ query, params })
    },
  },
})
