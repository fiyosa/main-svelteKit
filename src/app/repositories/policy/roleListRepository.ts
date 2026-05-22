import { resCatch, resSuccessData } from '$core/helper/response'
import type { ApiEvent } from '$core/provider/routeProvider'
import { db } from '$db'
import t from '$lang/lang'
import { roleListResource } from '$core/resources/policy'

export const roleListRepository = async (_event: ApiEvent) => {
  try {
    const roles = await db.query.roles.findMany({
      orderBy: (roles, { asc }) => [asc(roles.name)],
      with: {
        role_has_permissions: {
          with: {
            permission: true,
          },
        },
      },
    })

    return resSuccessData(roleListResource.collection(roles), t._('retrieved_successfully', { operator: t._('role') }))
  } catch (err) {
    return resCatch(err)
  }
}
