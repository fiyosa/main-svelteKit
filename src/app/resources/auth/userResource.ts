import hash from '$lib/server/hash/hash'

export default class loginResource {
  /**
   * Transform user data for single result
   */
  static single(user: any) {
    if (!user) return null

    return {
      id: hash.encodeId(user.id),
      username: user.username,
      email: user.email,
    }
  }

  /**
   * Transform user data for collection
   */
  static collection(users: any[]) {
    return users.map((user) => this.single(user))
  }
}
