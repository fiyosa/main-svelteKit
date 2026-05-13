import { json } from '@sveltejs/kit'
import swaggerJsdoc from 'swagger-jsdoc'
import secretPrivate from '$config/secretPrivate'

const servers = [
  {
    url: 'http://localhost:3000/api',
    description: 'Local development server (port 3000)',
  },
  {
    url: 'https://fiyosa.me/api',
    description: 'Production server',
  },
]

export class docController {
  static async openapi() {
    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'API Documentation',
          version: '1.0.0',
          description: 'API documentation for all available endpoints.',
        },
        servers: secretPrivate.APP_ENV === 'local' ? servers : [servers[1], servers[0]],
        components: {
          securitySchemes: {
            cookieAuth: {
              type: 'apiKey',
              in: 'cookie',
              name: 'token',
            },
          },
        },
      },
      apis: ['./src/app/openapi/**/*.yaml'],
    }

    const spec = swaggerJsdoc(options)
    return json(spec)
  }
}
