import { pgTable } from 'drizzle-orm/pg-core'

export const users = pgTable('users', (t) => ({
  id: t.bigserial('id', { mode: 'number' }).primaryKey(),

  email: t.varchar('email').unique().notNull(),
  username: t.varchar('username').unique().notNull(),
  password: t.varchar('password').notNull(),

  created_at: t.timestamp('created_at', { precision: 0 }).defaultNow().notNull(),
  updated_at: t.timestamp('updated_at', { precision: 0 }).defaultNow().notNull(),
  deleted_at: t.timestamp('deleted_at', { precision: 0 }),
}))
