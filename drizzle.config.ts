import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  dialect: 'postgresql',
  schema: './src/lib/server/db/schema/index.ts',
  dbCredentials: {
    url: process.env.PRIVATE_DB_URL || 'postgresql://postgres:postgres@localhost:5432/db',
  },
  migrations: { schema: 'public', table: '__drizzle_migrations' },
})
