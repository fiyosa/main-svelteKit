import { roleListRepository, permissionListRepository, permissionStoreRepository, permissionDestroyRepository } from '$core/repositories/policy'

export const roleList = roleListRepository

export const permission = {
  list: permissionListRepository,
  store: permissionStoreRepository,
  destroy: permissionDestroyRepository,
}
