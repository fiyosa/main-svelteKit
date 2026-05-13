import swaggerJsdoc from 'swagger-jsdoc'
import { writeFileSync, mkdirSync } from 'fs'
import { openapiDefinition } from './definition.js'

const options = {
  definition: {
    ...openapiDefinition,
    servers: [
      {
        url: 'https://fiyosa.me/api',
        description: 'Production server',
      },
    ],
  },
  apis: ['./src/app/openapi/**/*.yaml'],
}

const spec = swaggerJsdoc(options)
mkdirSync('./static', { recursive: true })
writeFileSync('./static/api/openapi.json', JSON.stringify(spec))
console.log('OpenAPI spec generated.')
