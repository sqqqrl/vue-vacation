class BaseController {
  actionRunner (action) {
    return async (req, res, next) => {
      try {
        /**
         * validate action input data
         */
        // if (action.validationRules) {
        //   if (action.validationRules.query) this.validateSchema(ctx.query, action.validationRules.query, 'query')
        //   if (action.validationRules.params) this.validateSchema(ctx.params, action.validationRules.params, 'params')
        //   if (action.validationRules.body) this.validateSchema(ctx.body, action.validationRules.body, 'body')
        //   if (action.validationRules.cookies) this.validateSchema(ctx.cookies, action.validationRules.cookies, 'cookies')
        // }

        /**
         * fire action
         */
        const response = await action.run(req.body)

        /**
         * set headers
         */
        if (response.headers) res.set(response.headers)

        /**
         * set status and return result to client
         */
        return res.status(response.status).json({
          success: response.success,
          message: response.message,
          data: response.data
        })
      } catch (error) {
        next(error)
      }
    }
  }
}