import { env as publicEnv } from '$env/dynamic/public'
import { env as privateEnv } from '$env/dynamic/private'

export const secret = {
  public: {
    API_URL: publicEnv.PUBLIC_API_URL || 'http://localhost:3000/graphql',
  },

  server: {
    GRAPHQL_URL: privateEnv.PRIVATE_GRAPHQL_URL || 'http://localhost:3000/graphql',
  },
}
