import { defineRelations } from 'drizzle-orm'
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

export const authsRelations = defineRelations({ auths, users }, (r) => ({
  auths: {
    user: r.one.users({
      from: r.auths.user_id,
      to: r.users.id,
    }),
  },

  users: {
    auths: r.many.auths({
      from: r.users.id,
      to: r.auths.user_id,
    }),
  },
}))
