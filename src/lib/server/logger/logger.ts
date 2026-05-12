import secretPrivate from '$config/secretPrivate'
import winston from 'winston'

const isDevelopment = secretPrivate.APP_ENV === 'development'

const formatMessage = (message: any) => {
  if (typeof message === 'object') {
    return JSON.stringify(message, null, 2)
  }
  return message
}

export default class logger {
  static file = winston.createLogger({
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

  static console = winston.createLogger({
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

  static customDrizzleLogger = {
    logQuery: (query: string, params: any[]) => {
      const formattedQuery = params.reduce((acc, param, index) => {
        const safeParam = JSON.stringify(param).replace(/^"|"$/g, "'")
        return acc.replace(`$${index + 1}`, safeParam)
      }, query)
      logger.file.info(formattedQuery)
    },
  }
}
