import { hashLib } from '$lib'

export const single = (user: any) => {
  if (!user) return null

  return {
    id: hashLib.encodeId(user.id),
    username: user.username,
    email: user.email,
  }
}

export const collection = (users: any[]) => {
  return users.map((user) => single(user))
}
