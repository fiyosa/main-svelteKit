import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import secretPrivate from '$config/secretPrivate'
import * as schema from './schema'
import logger from '$lib/server/logger/logger'

export const db = drizzle({
  client: postgres(secretPrivate.DB_URL),
  schema,
  ...(secretPrivate.APP_ENV === 'development' && { logger: logger.customDrizzleLogger }),
})
