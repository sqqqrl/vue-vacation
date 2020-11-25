const { Logger } = require("mongodb")

class BaseAction {
  static result (result) {
    return {
      success: result.success || true,
      status: result.status || 200,
      ...(result.cookies && { cookies: result.cookies }),
      ...(result.data && { data: result.data }),
      ...(result.headers && { headers: result.headers }),
      ...(result.message && { message: result.message })
    }
  }
}

module.exports = { BaseAction }