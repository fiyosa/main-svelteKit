import secretPublic from '../config/secretPublic'
import type { ILang } from './langType'
import { en } from './locales/en.lang'

export default class t {
  static lang = { en }

  static _ = (msg: keyof ILang, args?: any) => {
    let newMsg: string = this.lang[secretPublic.APP_LOCALE as keyof typeof this.lang][msg]
    if (typeof args === 'object' && !Array.isArray(args) && args !== null) {
      Object.keys(args).map((arg: string) => (newMsg = newMsg.replace(':' + arg, args[arg])))
      return newMsg
    }
    return newMsg
  }
}
