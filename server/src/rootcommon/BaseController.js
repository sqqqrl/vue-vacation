class BaseController {
  actionRunner (action) {
    return async (req, res, next) => {
      const ctx = {
        body: req.body,
        ip: req.ip,
        headers: {
          'User-Agent': req.get('User-Agent')
        }
      }

      try {
        const response = await action.run(ctx)

        return res.status(response.status).json({
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