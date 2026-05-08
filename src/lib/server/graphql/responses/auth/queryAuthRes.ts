import { zod } from '$lib/public'

export const queryAuthResGQL = `#graphql
  type DataQueryAuthRes {
    id: String
    username: String
    email: String
  }

  type QueryAuthRes {
    success: Boolean!
    message: String
    data: DataQueryAuthRes
  }
`

export const queryAuthRes = zod.create.object({
  success: zod.create.boolean(),
  message: zod.create.string().optional(),
  data: zod.create.any().optional(),
})

export type IQueryAuthRes = zod.create.infer<typeof queryAuthRes>
