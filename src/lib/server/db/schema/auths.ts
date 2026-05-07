import { relations } from 'drizzle-orm'
import { pgTable } from 'drizzle-orm/pg-core'
import { users } from './users'

export const auths = pgTable('auths', (t) => ({
  id: t.bigserial('id', { mode: 'number' }).primaryKey(),
  user_id: t
    .bigint('user_id', { mode: 'number' })
    .notNull()
    .references(() => users.id),

  token: t.text('token').notNull(),
  revoke: t.boolean('revoke').default(false).notNull(),

  created_at: t.timestamp('created_at', { precision: 0 }).defaultNow().notNull(),
  updated_at: t.timestamp('updated_at', { precision: 0 }).defaultNow().notNull(),
}))

export const authsRelations = relations(auths, ({ one }) => ({
  user: one(users, {
    fields: [auths.user_id],
    references: [users.id],
  }),
}))
