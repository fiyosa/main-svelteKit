import { defineConfig } from 'drizzle-kit'

const schemaName = process.env.PRIVATE_DB_SCHEMA || 'public'
const isCustomSchema = schemaName !== 'public'

export default defineConfig({
  schema: './src/lib/server/db/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.PRIVATE_DB_URL || 'postgresql://postgres:postgres@localhost:5432/db',
  },
  migrations: { schema: schemaName },
  ...(isCustomSchema && { schemaFilter: [schemaName] }),
})
