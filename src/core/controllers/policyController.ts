import {
  roleListRepository,
  permissionListRepository,
  permissionStoreRepository,
  permissionDestroyRepository,
} from '../repositories/policy'

export const roleList = roleListRepository

export const permission = {
  list: permissionListRepository,
  store: permissionStoreRepository,
  destroy: permissionDestroyRepository,
}
