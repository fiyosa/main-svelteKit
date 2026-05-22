import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import secretPrivate from '$config/secretPrivate'
import * as schema from './schema'
import { loggerLib } from '$lib'

export const db = drizzle({
  client: postgres(secretPrivate.DB_URL),
  schema,
  ...(secretPrivate.APP_ENV === 'local' && { logger: loggerLib.customDrizzleLogger }),
})
