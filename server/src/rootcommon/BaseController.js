class BaseController {
  actionRunner (action) {
    return async (req, res, next) => {
      const ctx = {
        body: req.body
      }

      try {
        const response = await action.run(ctx)

        console.log(response);

        return res.status(response.status).json({
          data: response.data
        })
      } catch (error) {
        console.log(error);
      }
    }
  }
}

module.exports = { BaseController };