class BaseController {
  constructor ({ logger } = {}) {
    if (!this.init) throw new Error(`${this.constructor.name} should implement 'init' method.`)
    if (!this.router) throw new Error(`${this.constructor.name} should implement 'router' getter.`)

    this.logger = logger
  }

  actionRunner (action) {
    return async (req, res, next) => {
      const ctx = {
        currentUser: req.currentUser,
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        url: req.url,
        cookies: { ...req.cookies, ...req.signedCookies },
        headers: {
          'Content-Type': req.get('Content-Type'),
          Referer: req.get('referer'),
          'User-Agent': req.get('User-Agent')
        }
      }

      try {

        /**
         * fire action
         */
        const response = await action.run(ctx);

        /**
         * set headers
         */
        if (response.headers) res.set(response.headers);

        /**
         * set cookie
         */
        if (response.cookies && response.cookies.length) {
          for (const cookie of response.cookies) {
            res.cookie(cookie.name, cookie.value, cookie.options)
          }
        }

        return res.status(response.status).json({
          success: response.success,
          data: response.data
        })
      } catch (error) {
        error.req = ctx
        next(error)
      }
    }
  }
}

module.exports = { BaseController };