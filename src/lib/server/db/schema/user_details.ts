import { tableCreator } from '../pgSchema'
import { defineRelations } from 'drizzle-orm'
import { users } from './users'

export const user_details = tableCreator('user_details', (t) => ({
  id: t.bigserial('id', { mode: 'number' }).primaryKey(),
  user_id: t
    .bigint('user_id', { mode: 'number' })
    .notNull()
    .references(() => users.id, { onUpdate: 'cascade', onDelete: 'cascade' }),

  name: t.text('first_name').notNull(),
  lastName: t.text('last_name').notNull(),

  created_at: t.timestamp('created_at', { precision: 0 }).defaultNow().notNull(),
  updated_at: t.timestamp('updated_at', { precision: 0 }).defaultNow().notNull(),
}))

export const userDetailsRelations = defineRelations({ user_details, users }, (r) => ({
  user_details: {
    user: r.one.users({
      from: r.user_details.user_id,
      to: r.users.id,
    }),
  },

  users: {
    user_details: r.one.user_details({
      from: r.users.id,
      to: r.user_details.user_id,
    }),
  },
}))
