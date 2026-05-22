import jsonwebtoken from 'jsonwebtoken'
import secret from '$config/secretPrivate'

interface IVerify {
  data: any
  iat: number
  exp: number
}

export const create = (data: any) => {
  try {
    return jsonwebtoken.sign({ data }, secret.APP_SECRET, { expiresIn: secret.APP_JWT_DURATION as any })
  } catch (_) {
    return ''
  }
}

export const verify = (token: string) => {
  try {
    return jsonwebtoken.verify(token, secret.APP_SECRET) as IVerify
  } catch (err) {
    return null
  }
}
