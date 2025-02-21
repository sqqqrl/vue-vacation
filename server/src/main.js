require('dotenv').config()
const controllers = require('./controllers')
const middlewares = require('./middlewares')
const config = require('./config')
const { Server, MongoDB } = require('server-core')
const errorMiddleware = require('./middlewares/errorMiddleware')
const logger = require('./logger')

config.rootInit().then(() => {
  return new Server({
    port: Number(config.app.port),
    host: config.app.host,
    controllers,
    middlewares,
    errorMiddleware,
    cookieSecret: config.app.cookieSecret,
    logger
  })
}).then((serverParams) => {
  logger.info('Server initialized...', serverParams)
  logger.debug('--- APP CONFIG ---')
  logger.debug(`HOST: ${config.app.host}`)
  logger.debug(`PORT: ${config.app.port}`)
  logger.debug('--- TOKENS CONFIGS ---')
  logger.debug('REFRESH:', config.token.refresh)
  logger.debug('ACCESS:', config.token.access.clear())
  logger.debug(`ISSUER: ${config.token.jwtIss}`)
}).catch(error => {
  logger.error('Server fails to initialize...', error)
})
  .then(() => {
    return new MongoDB({
      host: config.mongo.connection.host,
      port: config.mongo.connection.port,
      dbname: config.mongo.connection.database,
      logger
    })
  })
  .then(() => {
    logger.debug('---------')
    logger.debug(`Server listened at ${config.app.host}:${config.app.port}`)
    logger.debug('---------')
  })
  .catch(err => {
    logger.error('Failed to connect db', {reason: err.message})
    process.exit(1);
  })