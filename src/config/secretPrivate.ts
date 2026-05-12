import { env as privateEnv } from '$env/dynamic/private'

const secretPrivate = {
  APP_ENV: privateEnv.PRIVATE_APP_ENV || 'local',
  APP_LOCALE: privateEnv.PRIVATE_APP_LOCALE || 'en',
  APP_SECRET: privateEnv.PRIVATE_APP_SECRET || 'secret',

  APP_JWT_DURATION: privateEnv.PRIVATE_APP_JWT_DURATION || '1d',

  DB_URL: privateEnv.PRIVATE_DB_URL || 'postgresql://postgres:postgres@localhost:5432/db',
}

export default secretPrivate
