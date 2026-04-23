import { env as publicEnv } from '$env/dynamic/public'
import { env as privateEnv } from '$env/dynamic/private'

export const secret = {
  public: {
    API_URL: publicEnv.PUBLIC_API_URL || 'http://localhost:3000/graphql',
  },

  server: {
    APP_ENV: privateEnv.PRIVATE_APP_ENV || 'development',
    APP_SECRET: privateEnv.PRIVATE_APP_SECRET || 'secret',
    APP_LOCALE: privateEnv.PRIVATE_APP_LOCALE || 'en',

    GRAPHQL_URL: privateEnv.PRIVATE_GRAPHQL_URL || 'http://localhost:3000/graphql',
    DB_URL: privateEnv.PRIVATE_DB_URL || 'postgresql://postgres:postgres@localhost:5432/db',
    DB_SCHEMA: privateEnv.PRIVATE_DB_SCHEMA || 'public',
  },
}
