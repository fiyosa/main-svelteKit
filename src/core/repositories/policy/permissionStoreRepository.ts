import { resCatch, resError, resSuccess, resValidate } from '../../helper/response'
import type { ApiEvent } from '../../provider/routeProvider'
import { db } from '$db'
import { permissions } from '$db/schema'
import { eq } from 'drizzle-orm'
import t from '$lang/lang'
import { permissionStoreRequest } from '../../request/policy'

export const permissionStoreRepository = async (event: ApiEvent) => {
  try {
    const validate = permissionStoreRequest.safeParse(event.body)

    if (!validate.success) return resValidate(validate.error)

    const { name, notes } = validate.data

    const existing = await db
      .select({ id: permissions.id })
      .from(permissions)
      .where(eq(permissions.name, name))
      .limit(1)

    if (existing.length > 0) return resError(t._('save_failed', { operator: t._('permission') }))

    await db.insert(permissions).values({ name, notes })

    return resSuccess(t._('saved_successfully', { operator: t._('permission') }))
  } catch (err) {
    return resCatch(err)
  }
}
