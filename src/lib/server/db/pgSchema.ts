import { pgSchema, pgTable } from 'drizzle-orm/pg-core'

const schemaName = process.env.PRIVATE_DB_SCHEMA

export const tableCreator =
  !schemaName || schemaName === 'public' ? pgTable : (pgSchema(schemaName).table as unknown as typeof pgTable)
