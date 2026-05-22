import { resCatch, resError, resSuccess } from '$core/helper/response'
import type { ApiEvent } from '$core/provider/routeProvider'
import { db } from '$db'
import { permissions } from '$db/schema'
import { eq } from 'drizzle-orm'
import t from '$lang/lang'

export const permissionDestroyRepository = async (event: ApiEvent) => {
  try {
    const id = Number(event.params.id)

    if (!id) return resError(t._('not_found', { operator: t._('permission') }), null, 404)

    const existing = await db
      .select({ id: permissions.id })
      .from(permissions)
      .where(eq(permissions.id, id))
      .limit(1)

    if (existing.length < 1) return resError(t._('not_found', { operator: t._('permission') }), null, 404)

    await db
      .update(permissions)
      .set({ deleted_at: new Date() })
      .where(eq(permissions.id, id))

    return resSuccess(t._('deleted_successfully', { operator: t._('permission') }))
  } catch (err) {
    return resCatch(err)
  }
}
