import { Route, clearRoutes } from '$core/provider/routeProvider'
import { docController } from '$core/controllers/docController'
import authController from '$core/controllers/authController'
import guestController from '$core/controllers/guestController'

clearRoutes()

Route.get('openapi.json', docController.openapi)

Route.group('auth', (group) => {
  group.post('login', authController.login)
  group.delete('logout', authController.logout).middleware('auth')
  group.get('user', authController.user).middleware('auth')
})

Route.get('ping', guestController.ping)
