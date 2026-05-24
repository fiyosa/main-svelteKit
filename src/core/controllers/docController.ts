import { json } from '@sveltejs/kit'
import swaggerJsdoc from 'swagger-jsdoc'
import secretPrivate from '$config/secretPrivate'
import { openapiDefinition } from '../openapi/definition.js'
import { resError } from '../helper/response.js'

const servers = [
  { url: 'http://localhost:3000/api', description: 'Local development server (port 3000)' },
  { url: 'https://fiyosa.me/api', description: 'Production server' },
]

export const openapi = async () => {
  if (secretPrivate.APP_ENV !== 'local') return resError('Endpoint Not Found', null, 404)

  const options = {
    definition: {
      ...openapiDefinition,
      servers: secretPrivate.APP_ENV === 'local' ? servers : [servers[1], servers[0]],
    },
    apis: ['./src/core/openapi/**/*.yaml'],
  }

  const spec = swaggerJsdoc(options)
  return json(spec)
}
