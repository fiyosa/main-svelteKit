import { zod } from '$lib/public'

export const mutationLoginReqGQL = `#graphql
  input LoginReq {
    username: String!
    password: String!
  }
`

export const mutationLoginReq = zod.create.object({
  username: zod.create.string(),
  password: zod.create.string(),
})

export type IMutationLoginReq = zod.create.infer<typeof mutationLoginReq>
