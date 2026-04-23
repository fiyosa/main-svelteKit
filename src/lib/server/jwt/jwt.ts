import jwt from 'jsonwebtoken'
import { secret } from '$config/secret'

export const create = (data: any) => {
  try {
    return jwt.sign({ data }, secret.server.APP_SECRET, { expiresIn: '1d' })
  } catch (_) {
    return ''
  }
}

interface IVerify {
  data: any
  iat: number
  exp: number
}
export const verify = (token: string) => {
  try {
    return jwt.verify(token, secret.server.APP_SECRET) as IVerify
  } catch (err) {
    return null
  }
}
