import { resCatch, resSuccessData } from '../../helper/response'
import type { ApiEvent } from '../../provider/routeProvider'
import { db } from '$db'
import { permissions } from '$db/schema'
import { asc, isNull } from 'drizzle-orm'
import t from '$lang/lang'
import { permissionResource } from '../../resources/policy'

export const permissionListRepository = async (_event: ApiEvent) => {
  try {
    const result = await db
      .select()
      .from(permissions)
      .where(isNull(permissions.deleted_at))
      .orderBy(asc(permissions.name))

    return resSuccessData(
      permissionResource.collection(result),
      t._('retrieved_successfully', { operator: t._('permission') })
    )
  } catch (err) {
    return resCatch(err)
  }
}
