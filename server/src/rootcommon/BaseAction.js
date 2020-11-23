class BaseAction {
  static result (result) {
    return {
      success: result.success || true,
      status: result.status || 200,
      ...(result.data && { data: result.data }),
      ...(result.headers && { headers: result.headers })
    }
  }
}

module.exports = { BaseAction }