import { zodLib } from '$lib'

export const permissionStoreRequest = zodLib.create.object({
  name: zodLib.create.string(),
  notes: zodLib.create.string().nullable().optional(),
})
