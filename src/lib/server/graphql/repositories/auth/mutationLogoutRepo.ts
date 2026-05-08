import { db } from '$lib/server/db'
import { auths } from '$lib/server/db/schema/auths'
import { __ } from '../../../../../lang/lang'
import { type IMutationLogoutRes, mutationLogoutResGQL } from '../../responses/auth/mutationLogoutRes'
import { eq } from 'drizzle-orm'

export const mutationLogoutTypeDef = `#graphql
  extend type Mutation {
    logout: LogoutRes
  }

  # LogoutRes
  ${mutationLogoutResGQL}
`

export const mutationLogoutResolver = async (_: any, __args: any, ctx: any): Promise<IMutationLogoutRes> => {
  try {
    const sessionId = ctx.event.cookies.get('session_id')

    if (sessionId) {
      // Revoke token di database
      await db.update(auths).set({ revoke: true }).where(eq(auths.token, sessionId))

      // Hapus cookie
      ctx.event.cookies.delete('session_id', { path: '/' })
    }

    return {
      success: true,
      message: __('logout'),
    }
  } catch (error: any) {
    ctx.setHttpStatus(500)
    return {
      success: false,
      message: error?.message || __('something_went_wrong'),
    }
  }
}
