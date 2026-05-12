import secretPublic from '../config/secretPublic'
import { en } from './en.lang'

export const lang = { en }

export interface ILang {
  user: string
  contact: string
  address: string
  logout: string

  retrieved_successfully: string
  saved_successfully: string
  updated_successfully: string
  deleted_successfully: string

  user_unknown: string
  username_is_wrong: string

  unauthorized: string
  save_failed: string
  delete_failed: string
  something_went_wrong: string
  not_found: string
  err_validation: string
}

export const __ = (msg: keyof ILang, args?: any) => {
  let newMsg: string = lang[secretPublic.APP_LOCALE as keyof typeof lang][msg]
  if (typeof args === 'object' && !Array.isArray(args) && args !== null) {
    Object.keys(args).map((arg: string) => (newMsg = newMsg.replace(':' + arg, args[arg])))
    return newMsg
  }
  return newMsg
}
