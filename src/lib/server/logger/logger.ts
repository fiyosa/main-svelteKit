import { secret } from '$config/secret'
import winston from 'winston'

const isDevelopment = secret.server.APP_ENV === 'development'

const formatMessage = (message: any) => {
  if (typeof message === 'object') {
    return JSON.stringify(message, null, 2)
  }
  return message
}

export const file = winston.createLogger({
  ...(isDevelopment && {
    format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })),
    transports: [
      new winston.transports.File({
        filename: 'logs/sveltekit.log',
        format: winston.format.combine(
          winston.format.printf((info) => {
            const message = typeof info.message === 'object' ? JSON.stringify(info.message, null, 2) : info.message
            return `${info.timestamp} ${info.level}: ${message}`
          })
        ),
      }),
    ],
  }),
})

export const console = winston.createLogger({
  ...(isDevelopment && {
    format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.printf((info) => {
            const formattedMessage = formatMessage(info.message)
            return `${info.timestamp} ${info.level}: ${formattedMessage}`
          })
        ),
      }),
    ],
  }),
})
