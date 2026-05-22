import secretPrivate from '$config/secretPrivate'
import winston from 'winston'

const isDevelopment = secretPrivate.APP_ENV === 'local'

const formatMessage = (message: any) => {
  if (typeof message === 'object') {
    return JSON.stringify(message, null, 2)
  }
  return message
}

export const fileLogger = isDevelopment
  ? winston.createLogger({
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
    })
  : winston.createLogger({})

export const consoleLogger = isDevelopment
  ? winston.createLogger({
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
    })
  : winston.createLogger({})

export const customDrizzleLogger = {
  logQuery: (query: string, params: any[]) => {
    const formattedQuery = params.reduce((acc, param, index) => {
      const safeParam = JSON.stringify(param).replace(/^"|"$/g, "'")
      return acc.replace(`$${index + 1}`, safeParam)
    }, query)
    fileLogger.info(formattedQuery)
  },
}
