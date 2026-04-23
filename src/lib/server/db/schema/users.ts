import { tableCreator } from '../pgSchema'

export const users = tableCreator('users', (t) => ({
  id: t.bigserial('id', { mode: 'number' }).primaryKey(),

  username: t.text('username').unique().notNull(),
  email: t.text('email').unique().notNull(),

  created_at: t.timestamp('created_at', { precision: 0 }).defaultNow().notNull(),
  updated_at: t.timestamp('updated_at', { precision: 0 }).defaultNow().notNull(),
  deleted_at: t.timestamp('deleted_at', { precision: 0 }),
}))
