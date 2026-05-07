import { zod } from '$lib/public'
import { type IMutationLoginReq, mutationLoginReq, mutationLoginReqGQL } from '../../requests/auth/mutationLoginReq'
import { type IMutationLoginRes, mutationLoginResGQL } from '../../responses/auth/mutationLoginRes'

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
  { input }: { input: IMutationLoginReq }
): Promise<IMutationLoginRes> => {
  const validated: IMutationLoginReq = zod.validate(mutationLoginReq, input)

  return {
    success: true,
    message: `user_${validated.username}, ${validated.password}`,
  }
}
