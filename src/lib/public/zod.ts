import i18next from 'i18next'
import id from 'zod-i18n-map/locales/id/zod.json'
import en from 'zod-i18n-map/locales/en/zod.json'
import { zodI18nMap } from 'zod-i18n-map'
import { ZodType, z, ZodError } from 'zod'
import secretPublic from '$config/secretPublic'

i18next.init({
  lng: secretPublic.APP_LOCALE,
  resources: {
    en: { zod: en },
    id: { zod: id },
  },
})

z.config({ customError: zodI18nMap })

const validate = <T>(zodType: ZodType<T>, data: T): T => {
  return zodType.parse(data)
}

export { z as create, ZodType as type, ZodError, validate }
