import { env as publicEnv } from '$env/dynamic/public'

const secretPublic = {
  API_URL: publicEnv.PUBLIC_API_URL || 'http://localhost:3000',
  APP_LOCALE: publicEnv.PUBLIC_APP_LOCALE || 'en',
}

export default secretPublic
