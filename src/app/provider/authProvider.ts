import { db } from '$db'
import { and, eq } from 'drizzle-orm'
import { permissions, role_has_permissions, user_has_roles } from '$db/schema'
import type { ApiEvent } from './routeProvider'

export const checkPolicy = async (event: ApiEvent, requiredPermission: string): Promise<boolean> => {
  if (!event.user_id) return false

  const result = await db.select({ id: permissions.id })
    .from(permissions)
    .innerJoin(role_has_permissions, eq(role_has_permissions.permission_id, permissions.id))
    .innerJoin(user_has_roles, eq(user_has_roles.role_id, role_has_permissions.role_id))
    .where(
      and(
        eq(user_has_roles.user_id, event.user_id),
        eq(permissions.name, requiredPermission)
      )
    )
    .limit(1)

  return result.length > 0
}
