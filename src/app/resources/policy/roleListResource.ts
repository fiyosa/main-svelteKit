import { hashLib } from '$lib'

export const single = (role: any) => {
  if (!role) return null

  return {
    id: hashLib.encodeId(role.id),
    name: role.name,
    notes: role.notes,
    created_at: role.created_at,
    updated_at: role.updated_at,
    deleted_at: role.deleted_at,
    permissions: role.role_has_permissions
      .map((rhp: any) => ({
        id: hashLib.encodeId(rhp.permission.id),
        name: rhp.permission.name,
        notes: rhp.permission.notes,
        created_at: rhp.permission.created_at,
        updated_at: rhp.permission.updated_at,
        deleted_at: rhp.permission.deleted_at,
      }))
      .sort((a: any, b: any) => a.name.localeCompare(b.name)),
  }
}

export const collection = (roles: any[]) => {
  return roles.map((role) => single(role))
}
