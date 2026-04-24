import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../schema'
import winston from 'winston'

// Dedicated database client for CLI/Scripts
// This avoids importing SvelteKit's $env which causes ERR_MODULE_NOT_FOUND in standalone Node.js
const DB_URL = process.env.PRIVATE_DB_URL

if (!DB_URL) {
  throw new Error('PRIVATE_DB_URL is not defined. Make sure to run with --env-file .env')
}

const dbLogger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })),
  transports: [
    new winston.transports.File({
      filename: 'logs/sveltekit.log',
      format: winston.format.combine(
        winston.format.printf((info) => {
          const message = typeof info.message === 'object' ? JSON.stringify(info.message, null, 2) : info.message
          return `${info.timestamp} ${info.level}: ${message}`
        })
      ),
    }),
  ],
})

export const db = drizzle({
  client: postgres(DB_URL),
  schema,
  logger: {
    logQuery(query, params) {
      dbLogger.info({ query, params })
    },
  },
})
