import { pgTable } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { auths } from './auths'
import { user_details } from './user_details'
import { user_has_roles } from './user_has_roles'

export const users = pgTable('users', (t) => ({
  id: t.bigserial('id', { mode: 'number' }).primaryKey(),

  email: t.varchar('email').unique().notNull(),
  username: t.varchar('username').unique().notNull(),
  password: t.varchar('password').notNull(),

  created_at: t.timestamp('created_at', { precision: 0 }).defaultNow().notNull(),
  updated_at: t.timestamp('updated_at', { precision: 0 }).defaultNow().notNull(),
  deleted_at: t.timestamp('deleted_at', { precision: 0 }),
}))

export const usersRelations = relations(users, ({ one, many }) => ({
  auths: many(auths),
  user_details: one(user_details),
  user_has_roles: many(user_has_roles),
}))
