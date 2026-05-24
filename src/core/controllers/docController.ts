import { json } from '@sveltejs/kit'
import swaggerJsdoc from 'swagger-jsdoc'
import secretPrivate from '$config/secretPrivate'
import { resError } from '../helper/response.js'

const servers = [
  { url: 'http://localhost:3000/api', description: 'Local development server (port 3000)' },
  { url: 'https://fiyosa.me/api', description: 'Production server' },
]

const openapiDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API documentation for all available endpoints.',
  },
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'token',
      },
    },
  },
}

export const openapi = async () => {
  if (secretPrivate.APP_ENV !== 'local') return resError('Endpoint Not Found', null, 404)

  const options = {
    definition: {
      ...openapiDefinition,
      servers:
        secretPrivate.APP_ENV === 'local'
          ? //
            servers
          : [servers[1], servers[0]],
    },
    apis: ['./src/core/controllers/**/*.ts'],
  }

  const spec = swaggerJsdoc(options)
  return json(spec)
}
