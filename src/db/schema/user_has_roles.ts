import { pgTable, primaryKey } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './users'
import { roles } from './roles'

export const user_has_roles = pgTable(
  'user_has_roles',
  (t) => ({
    user_id: t.bigint('user_id', { mode: 'number' }).notNull().references(() => users.id, { onDelete: 'cascade' }),
    role_id: t.bigint('role_id', { mode: 'number' }).notNull().references(() => roles.id, { onDelete: 'cascade' }),
  }),
  (t) => [
    primaryKey({ columns: [t.user_id, t.role_id] }),
  ]
)

export const userHasRolesRelations = relations(user_has_roles, ({ one }) => ({
  user: one(users, {
    fields: [user_has_roles.user_id],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [user_has_roles.role_id],
    references: [roles.id],
  }),
}))
