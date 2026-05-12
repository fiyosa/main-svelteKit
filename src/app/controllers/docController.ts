import { json } from '@sveltejs/kit'
import type { ApiEvent } from '../provider/routeProvider'
import swaggerJsdoc from 'swagger-jsdoc'

export class docController {
  static async openapi(event: ApiEvent) {
    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Fiyosa API Documentation',
          version: '1.0.0',
          description: 'Dokumentasi API yang dihasilkan otomatis dari JSDoc Controller',
        },
        servers: [
          {
            url: '/api',
          },
        ],
      },
      apis: ['./src/app/controllers/*.ts'],
    }

    const spec = swaggerJsdoc(options)
    return json(spec)
  }
}
