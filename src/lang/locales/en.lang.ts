import { type ILang } from '../langType'

export const en: ILang = {
  user: 'User',
  contact: 'Contact',
  address: 'Address',

  logout: 'Logout successfully',
  retrieved_successfully: ':operator retrieved successfully',
  saved_successfully: ':operator saved successfully',
  updated_successfully: ':operator updated successfully',
  deleted_successfully: ':operator deleted successfully',

  user_unknown: "User does't exist, please register",
  username_is_wrong: 'Username or password is wrong',
  login_failed: 'Login failed, please try again',

  unauthorized: 'Unauthorized',
  save_failed: ':operator failed to save',
  delete_failed: ':operator failed to delete',
  something_went_wrong: 'Something went wrong',
  not_found: ':operator not found',
  err_validation: 'The data given was invalid',
  forbidden: 'Forbidden: Insufficient Permissions',
  endpoint_not_found: 'Endpoint Not Found',
}
