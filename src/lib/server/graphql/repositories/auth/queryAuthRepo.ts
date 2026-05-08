import { queryAuthResGQL, type IQueryAuthRes } from '../../responses/auth/queryAuthRes'
import { __ } from '../../../../../lang/lang'
import hash from '$lib/server/hash'

export const queryAuthTypeDef = `#graphql
  extend type Query {
    auth: QueryAuthRes
  }

  # QueryAuthRes
  ${queryAuthResGQL}
`

export const queryAuthResolver = async (_: any, ___: any, ctx: any): Promise<IQueryAuthRes> => {
  return {
    success: true,
    message: __('retrieved_successfully', { operator: 'User' }),
    data: ctx?.user
      ? {
          id: hash.encode(ctx.user.id),
          username: ctx.user.username,
          email: ctx.user.email,
        }
      : null,
  }
}
