import { json } from '@sveltejs/kit'
import type { ApiEvent } from '../provider/routeProvider'
import hash from '$lib/server/hash'

export class userController {
  /**
   * @openapi
   * /ping:
   *   get:
   *     summary: Ping Server
   *     description: Mendapatkan status server dan contoh hash ID.
   *     responses:
   *       200:
   *         description: Berhasil
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: pong
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: number
   *                       example: 12345
   *                     hash:
   *                       type: string
   *                       example: DogerlGAKAxm
   */
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

  /**
   * @openapi
   * /hash/{data_id}:
   *   get:
   *     summary: Decode Hash
   *     description: Mendecode hash ID menggunakan HashMiddleware.
   *     parameters:
   *       - in: path
   *         name: data_id
   *         required: true
   *         schema:
   *           type: string
   *           minLength: 1
   *           example: "DogerlGAKAxm"
   *     responses:
   *       200:
   *         description: Berhasil
   */
  static async hash(event: ApiEvent) {
    return json({
      message: {
        data_id: event.params.data_id,
      },
    })
  }
}
