import { zod } from '$lib/public'

export const loginRequest = zod.create.object({
  username: zod.create.string(),
  password: zod.create.string(),
})
