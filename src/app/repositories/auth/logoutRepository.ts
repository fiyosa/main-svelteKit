import { resCatch, resSuccess } from '$core/helper/response'
import type { ApiEvent } from '$core/provider/routeProvider'
import { db } from '$lib/server/db'
import { auths } from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'
import t from '$lang/lang'

export const logoutRepository = async (event: ApiEvent) => {
  try {
    const token = event.cookies.get('token')

    if (token) {
      // Revoke token in DB so it can't be reused even if cookie is replayed
      await db.update(auths).set({ revoke: true }).where(eq(auths.token, token))
    }

    event.cookies.delete('token', { path: '/' })

    return resSuccess(t._('logout'))
  } catch (err) {
    return resCatch(err)
  }
}
