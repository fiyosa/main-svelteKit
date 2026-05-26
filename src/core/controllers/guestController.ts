import { resSuccess } from '../helper/response'

/**
 * @openapi
 * /guest/ping:
 *   get:
 *     tags: [Guest]
 *     summary: Ping Server
 *     description: Mendapatkan status server dan contoh hash ID.
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: pong }
 *                 data:
 *                   type: object
 *                   properties:
 *                     id: { type: number, example: 12345 }
 *                     hash: { type: string, example: DogerlGAKAxm }
 */
export const ping = () => resSuccess('pong')
