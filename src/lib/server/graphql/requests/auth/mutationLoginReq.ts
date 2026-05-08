import { zod } from '$lib/public'

export const mutationLoginReqGQL = `#graphql
  input LoginReq {
    username: String!
    password: String!
    ip: String!
    user_agent: String!
  }
`

export const mutationLoginReq = zod.create.object({
  username: zod.create.string(),
  password: zod.create.string(),
  ip: zod.create.string(),
  user_agent: zod.create.string(),
})

export type IMutationLoginReq = zod.create.infer<typeof mutationLoginReq>
