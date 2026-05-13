import { Route, clearRoutes } from '$core/provider/routeProvider'
import { docController } from '$core/controllers/docController'
import authController from '$core/controllers/authController'
import guestController from '$core/controllers/guestController'

clearRoutes()

Route.get('openapi.json', docController.openapi)

Route.post('auth/login', authController.login)
Route.delete('auth/logout', authController.logout).middleware('auth')
Route.get('auth/user', authController.user).middleware('auth')

Route.get('ping', guestController.ping)
