import { loginRepository } from '$core/repositories/auth/loginRepository'
import { logoutRepository } from '$core/repositories/auth/logoutRepository'
import { userRepository } from '$core/repositories/auth/userRepository'

export default class authController {
  static login = loginRepository

  static logout = logoutRepository

  static user = userRepository
}
