import { json } from '@sveltejs/kit'
import type { ApiEvent } from '../provider/routeProvider'
import hash from '$lib/server/hash'

export class userController {
  static async ping(event: ApiEvent) {
    return json({
      message: 'pong',
      data: {
        id: 12345,
        hash: hash.encodeId(12345),
        t: 'a',
        a: '1',
      },
    })
  }

  static async hash(event: ApiEvent) {
    return json({
      message: {
        data_id: event.params.data_id,
      },
    })
  }
}
