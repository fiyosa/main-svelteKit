import { Route, clearRoutes } from '../provider/routeProvider'
import { docController, authController, policyController, guestController } from '../controllers'

clearRoutes()

Route.get('openapi.json', docController.openapi)

Route.group('auth', (group) => {
  group.post('login', authController.login)
  group.delete('logout', authController.logout).middleware('auth')
  group.get('user', authController.user).middleware('auth')
})

Route.group('policy', (group) => {
  group.get('role', policyController.roleList)

  group.get('permission', policyController.permissionList)
  group.post('permission', policyController.permissionStore)
  group.delete('permission/:id', policyController.permissionDestroy).middleware('hash')
})

Route.get('ping', guestController.ping)
