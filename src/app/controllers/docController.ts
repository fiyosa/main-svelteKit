import { json } from '@sveltejs/kit'
import swaggerJsdoc from 'swagger-jsdoc'

export class docController {
  static async openapi() {
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
            url: 'http://localhost:3000/api',
          },
          {
            url: 'http://localhost:4000/api',
          },
        ],
      },
      apis: ['./src/app/openapi/**/*.yaml'],
    }

    const spec = swaggerJsdoc(options)
    return json(spec)
  }
}
