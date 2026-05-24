import swaggerJsdoc from 'swagger-jsdoc'
import { writeFileSync, mkdirSync } from 'fs'

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
  apis: ['./src/core/controllers/**/*.ts'],
}

const spec = swaggerJsdoc(options)
mkdirSync('./static', { recursive: true })
writeFileSync('./static/openapi.json', JSON.stringify(spec))
console.log('OpenAPI spec generated.')
