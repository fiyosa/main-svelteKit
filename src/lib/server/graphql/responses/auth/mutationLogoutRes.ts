import { zod } from '$lib/public'

export const mutationLogoutResGQL = `#graphql
  type LogoutRes {
    success: Boolean!
    message: String
  }
`

export const mutationLogoutRes = zod.create.object({
  success: zod.create.boolean(),
  message: zod.create.string().optional(),
})

export type IMutationLogoutRes = zod.create.infer<typeof mutationLogoutRes>
