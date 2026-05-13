import { resSuccess } from '$core/helper/response'

export default class guestController {
  static ping() {
    return resSuccess('pong')
  }
}
