import { hashLib } from '$lib'

export const single = (permission: any) => {
  if (!permission) return null

  return {
    id: hashLib.encodeId(permission.id),
    name: permission.name,
    notes: permission.notes,
    created_at: permission.created_at,
    updated_at: permission.updated_at,
    deleted_at: permission.deleted_at,
  }
}

export const collection = (permissions: any[]) => {
  return permissions.map((permission) => single(permission))
}
