import { pgTable, primaryKey } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { roles } from './roles'
import { permissions } from './permissions'

export const role_has_permissions = pgTable(
  'role_has_permissions',
  (t) => ({
    role_id: t
      .bigint('role_id', { mode: 'number' })
      .notNull()
      .references(() => roles.id, { onDelete: 'cascade' }),
    permission_id: t
      .bigint('permission_id', { mode: 'number' })
      .notNull()
      .references(() => permissions.id, { onDelete: 'cascade' }),
  }),
  (t) => [primaryKey({ columns: [t.role_id, t.permission_id] })]
)

export const roleHasPermissionsRelations = relations(role_has_permissions, ({ one }) => ({
  role: one(roles, {
    fields: [role_has_permissions.role_id],
    references: [roles.id],
  }),
  permission: one(permissions, {
    fields: [role_has_permissions.permission_id],
    references: [permissions.id],
  }),
}))
