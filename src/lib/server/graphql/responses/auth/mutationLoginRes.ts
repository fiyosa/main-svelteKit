import { zod } from '$lib/public'

export const mutationLoginResGQL = `#graphql
  type LoginRes {
    success: Boolean!
    message: String
    errors: [LoginError]
  }

  type LoginError {
    field: String
    message: String
  }
`

export const mutationLoginRes = zod.create.object({
  success: zod.create.boolean(),
  message: zod.create.string().optional(),
  errors: zod.create
    .array(
      zod.create.object({
        field: zod.create.string(),
        message: zod.create.string(),
      })
    )
    .optional(),
})

export type IMutationLoginRes = zod.create.infer<typeof mutationLoginRes>
