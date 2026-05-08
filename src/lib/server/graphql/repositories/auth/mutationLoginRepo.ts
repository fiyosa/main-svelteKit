import { zod } from '$lib/public'
import { db } from '$lib/server/db'
import { auths } from '$lib/server/db/schema/auths'
import { secret } from '$config/secret'
import * as jwt from '$lib/server/jwt/jwt'
import * as hash from '$lib/server/hash/hash'
import { type IMutationLoginReq, mutationLoginReq, mutationLoginReqGQL } from '../../requests/auth/mutationLoginReq'
import { type IMutationLoginRes, mutationLoginResGQL } from '../../responses/auth/mutationLoginRes'
import { __ } from '../../../../../lang/lang'

export const mutationLoginTypeDef = `#graphql
  extend type Mutation {
    login(input: LoginReq!): LoginRes
  }

  # LoginReq
  ${mutationLoginReqGQL}

  # LoginRes
  ${mutationLoginResGQL}
`

export const mutationLoginResolver = async (
  _: any,
  { input }: { input: IMutationLoginReq },
  ctx: any
): Promise<IMutationLoginRes> => {
  try {
    const validated: IMutationLoginReq = zod.validate(mutationLoginReq, input)

    const user = await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.username, validated.username),
    })

    if (!user) {
      ctx.setHttpStatus(401)
      return {
        success: false,
        message: __('username_is_wrong'),
      }
    }

    // Verifikasi Password
    if (!hash.verify(validated.password, user.password)) {
      ctx.setHttpStatus(401)
      return {
        success: false,
        message: __('username_is_wrong'),
      }
    }

    // Buat JWT Token
    const token = jwt.create({
      id: user.id,
      username: user.username,
    })

    // Simpan ke DB tabel auths
    await db.insert(auths).values({
      user_id: user.id,
      token: token,
      revoke: false,
      ip: validated.ip,
      user_agent: validated.user_agent,
    })

    // Simpan ke Cookie (berlaku 1 hari sesuai expiry JWT)
    ctx.event.cookies.set('session_id', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: secret.server.APP_ENV !== 'development',
      maxAge: 60 * 60 * 24, // 1 hari
    })

    return {
      success: true,
      message: __('saved_successfully', { operator: 'Login' }),
    }
  } catch (error: any) {
    if (error instanceof zod.ZodError) {
      ctx.setHttpStatus(400)
      return {
        success: false,
        message: __('err_validation'),
      }
    }
    ctx.setHttpStatus(500)
    return {
      success: false,
      message: error?.message || __('something_went_wrong'),
    }
  }
}
