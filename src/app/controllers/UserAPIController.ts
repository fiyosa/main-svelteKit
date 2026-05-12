import { json } from '@sveltejs/kit'
import type { ApiEvent } from '../provider/routeProvider'
import hash from '$lib/server/hash'

export class UserAPIController {
  static async ping(event: ApiEvent) {
    // const user = event.user;
    return json({
      message: 'pong',
      data: {
        id: 12345,
        hash: hash.encodeId(12345),
      },
    })
  }

  static async generateVerificationCode(event: ApiEvent) {
    return json({ message: 'Ini dari UserAPIController.generateVerificationCode' })
  }

  static async changeStatus(event: ApiEvent) {
    return json({
      message: {
        data_id: event.params.data_id,
      },
    })
  }
}
