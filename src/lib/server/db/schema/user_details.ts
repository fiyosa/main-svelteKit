import { pgTable } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './users'

export const user_details = pgTable('user_details', (t) => ({
  id: t.bigserial('id', { mode: 'number' }).primaryKey(),
  user_id: t
    .bigint('user_id', { mode: 'number' })
    .notNull()
    .references(() => users.id, { onUpdate: 'cascade', onDelete: 'cascade' }),

  name: t.varchar('first_name').notNull(),
  lastName: t.varchar('last_name').notNull(),

  created_at: t.timestamp('created_at', { precision: 0 }).defaultNow().notNull(),
  updated_at: t.timestamp('updated_at', { precision: 0 }).defaultNow().notNull(),
}))

export const userDetailsRelations = relations(user_details, ({ one }) => ({
  user: one(users, {
    fields: [user_details.user_id],
    references: [users.id],
  }),
}))
