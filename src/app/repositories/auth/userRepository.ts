import { resCatch, resSuccessData } from '$core/helper/response'
import type { ApiEvent } from '$core/provider/routeProvider'
import userResource from '$core/resources/auth/userResource'
import t from '$lang/lang'
import { db } from '$db'

export const userRepository = async (event: ApiEvent) => {
  try {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, event.user_id),
    })

    return resSuccessData(
      userResource.single(user),
      t._('retrieved_successfully', {
        operator: t._('user'),
      })
    )
  } catch (err) {
    return resCatch(err)
  }
}
