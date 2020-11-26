const express = require('express')
const path = require('path')
const morganLogger = require('morgan')
const cookieParser = require('cookie-parser')


// const { AbstractLogger } = require('./AbstractLogger')

class Server {
  constructor ({ port, host, controllers, middlewares, cookieSecret, reqLimit = '5mb', logger }) {

    /**
     * 
     * 
     * TODO: TESTS FOR INCOMING PARAMS
     * 
     *  
     **/

    logger.info('Server start initialization...')
    return start({ port, host, controllers, middlewares, cookieSecret, reqLimit, logger })
  }
}

function start ({ port, host, controllers, middlewares, cookieSecret, reqLimit, logger }) {
  return new Promise(async (resolve, reject) => {
    const app = express()

    if (process.env.NODE_ENV !== 'production')  app.use(morganLogger('dev'))
    app.use(express.json({ limit: reqLimit }))
    app.use(express.urlencoded({ extended: false, limit: reqLimit }))
    app.use(cookieParser(cookieSecret))
    // app.use(express.static(path.join(__dirname, 'public')))

    /**
     * middlewares initialization
     */
    try {
      for (const middleware of middlewares.map(Middleware => new Middleware({ logger }))) {
        // await middleware.init()
        app.use(middleware.handler())
      }
    } catch (e) {
      return reject(e)
    }

    /**
     * controllers initialization
     */
    try {
      for (const controller of controllers.map(Controller => new Controller({ logger }))) {
        await controller.init()
        app.use(controller.router)
      }
    } catch (e) {
      reject(e)
    }

    /**
     * error handler
     */
    // try {
    //   // const middleware = new ErrorMiddleware({ logger })
    //   // await middleware.init()
    //   app.use(middleware.handler())
    // } catch (e) {
    //   return reject(e)
    // }

    /**
     * Not found route handler
     */
    app.use((req, res) => {
      res.status(404).json({
        message: `Route: '${req.url}' not found`,
        code: 'ROUTE_NOT_FOUND_ERROR'
      })
    })

    process.on('unhandledRejection', (reason, promise) => {
      logger.error('unhandledRejection', reason)
    })

    process.on('rejectionHandled', promise => {
      logger.warn('rejectionHandled', promise)
    })

    process.on('multipleResolves', (type, promise, reason) => {
      logger.error('multipleResolves', { type, promise, reason })
    })

    process.on('uncaughtException', error => {
      logger.fatal('uncaughtException', error)
      process.exit(1)
    })

    return app.listen(port, host, () => resolve({ port, host }))
  })
}

module.exports = { Server }
