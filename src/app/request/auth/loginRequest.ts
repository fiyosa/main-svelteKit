import { zodLib } from '$lib'

export const loginRequest = zodLib.create.object({
  username: zodLib.create.string(),
  password: zodLib.create.string(),
})
