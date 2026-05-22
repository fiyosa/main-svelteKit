import { resCatch, resError, resSuccess, resValidate } from '$core/helper/response'
import type { ApiEvent } from '$core/provider/routeProvider'
import { loginRequest } from '$core/request/auth/loginRequest'
import { db } from '$db'
import { hashLib, jwtLib } from '$lib'
import t from '$lang/lang'
import secretPrivate from '$config/secretPrivate'
import { auths } from '$db/schema'

export const loginRepository = async (event: ApiEvent) => {
  try {
    const validate = loginRequest.safeParse(event.body)

    if (!validate.success) return resValidate(validate.error)

    const { username, password } = validate.data

    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, username),
    })

    if (!user) return resError(t._('user_unknown'))

    if (!hashLib.verify(password, user.password)) return resError(t._('username_is_wrong'))

    const token = jwtLib.create({ id: user.id })

    const result = await db
      .insert(auths)
      .values({
        user_id: user.id,
        token,
        ip: event.request.headers.get('x-forwarded-for') || '',
        user_agent: event.request.headers.get('user-agent') || '',
      })
      .returning({ id: auths.id })

    if (result.length < 1) return resError(t._('login_failed'))

    event.cookies.set('token', token, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: secretPrivate.APP_ENV === 'local' ? 'lax' : 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return resSuccess('Login success.')
  } catch (err) {
    return resCatch(err)
  }
}
