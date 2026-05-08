import type { RequestEvent } from '@sveltejs/kit'
import * as jwt from '$lib/server/jwt/jwt'
import { db } from '$lib/server/db'
import { users } from '$lib/server/db/schema/users'
import { auths } from '$lib/server/db/schema/auths'
import { eq, and } from 'drizzle-orm'

export const appProvider = async (event: RequestEvent) => {
  try {
    const sessionId = event.cookies.get('session_id')
    let user = null

    if (sessionId) {
      const decoded = jwt.verify(sessionId)

      if (decoded && decoded.data?.id) {
        // Cek apakah token masih valid (belum direvoke) di database
        const authRecord = await db.query.auths.findFirst({
          where: and(eq(auths.token, sessionId), eq(auths.revoke, false)),
        })

        if (authRecord) {
          // Ambil data user lengkap
          user =
            (await db.query.users.findFirst({
              where: eq(users.id, decoded.data.id),
            })) || null
        }
      }
    }

    return {
      event,
      user,
    }
  } catch (error) {
    // Jika ada error (db down, jwt corrupt, dll), kembalikan user null
    return {
      event,
      user: null,
    }
  }
}
