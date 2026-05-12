import { Route } from '../provider/routeProvider'
import { UserAPIController } from '../controllers/UserAPIController'

Route.get('ping', UserAPIController.ping)

Route.post('generate/verification-code', UserAPIController.generateVerificationCode)
Route.get('id/{data_id}', UserAPIController.changeStatus).middleware('hash')
