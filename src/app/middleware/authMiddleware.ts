import { resError } from '../helper/response'
import { registerMiddleware, type ApiEvent } from '../provider/routeProvider'
import t from '$lang/lang'
import { db } from '../../lib/server/db'

export const authMiddleware = async (event: ApiEvent) => {
  let token = event.cookies.get('token')

  if (!token) return resError(t._('unauthorized'), null, 401)

  const auth = await db.query.auths.findFirst({
    where: (auths, { eq, and }) => and(eq(auths.token, token), eq(auths.revoke, false)),
    with: {
      user: true,
    },
  })

  if (!auth || !auth.user) return resError(t._('unauthorized'), null, 401)

  event.user_id = auth.user.id
}

registerMiddleware('auth', authMiddleware)
