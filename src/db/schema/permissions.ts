import { pgTable } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { role_has_permissions } from './role_has_permissions'

export const permissions = pgTable('permissions', (t) => ({
  id: t.bigserial('id', { mode: 'number' }).primaryKey(),

  name: t.varchar('name').unique().notNull(),

  created_at: t.timestamp('created_at', { precision: 0 }).defaultNow().notNull(),
  updated_at: t.timestamp('updated_at', { precision: 0 }).defaultNow().notNull(),
  deleted_at: t.timestamp('deleted_at', { precision: 0 }),
}))

export const permissionsRelations = relations(permissions, ({ many }) => ({
  role_has_permissions: many(role_has_permissions),
}))
