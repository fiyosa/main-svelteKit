import secretPrivate from '$config/secretPrivate'
import * as bycrypt from 'bcryptjs'
import Hashids from 'hashids'

const hashids = new Hashids(secretPrivate.APP_SECRET, 12)

export const generate = (data: string): string => {
  try {
    return bycrypt.hashSync(data, 10)
  } catch (_) {
    ;``
    return ''
  }
}

export const verify = (check: string, encrypted: string): boolean => {
  try {
    return bycrypt.compareSync(check, encrypted)
  } catch (_) {
    return false
  }
}

export const encodeId = (data: string | number): string => {
  try {
    return hashids.encode(data.toString())
  } catch (_) {
    return ''
  }
}

export const decodeId = (data: string): string => {
  try {
    return hashids.decode(data)[0].toString()
  } catch (_) {
    return ''
  }
}
