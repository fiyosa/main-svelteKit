import { Route, clearRoutes } from '../provider/routeProvider'
import { userController } from '../controllers/userController'
import { docController } from '../controllers/docController'

clearRoutes()

Route.get('openapi.json', docController.openapi)

Route.get('ping', userController.ping)
Route.get('hash/{data_id}', userController.hash).middleware('hash')
