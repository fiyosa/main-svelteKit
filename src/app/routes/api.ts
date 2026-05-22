import { Route, clearRoutes } from '$core/provider/routeProvider'
import { docController, authController, policyController, guestController } from '$core/controllers'

clearRoutes()

Route.get('openapi.json', docController.openapi)

Route.group('auth', (group) => {
  group.post('login', authController.login)
  group.delete('logout', authController.logout).middleware('auth')
  group.get('user', authController.user).middleware('auth')
})

Route.group('policy', (group) => {
  group.get('role', policyController.roleList)

  group.get('permission', policyController.permission.list)
  group.post('permission', policyController.permission.store)
  group.delete('permission/:id', policyController.permission.destroy).middleware('hash')
})

Route.get('ping', guestController.ping)
