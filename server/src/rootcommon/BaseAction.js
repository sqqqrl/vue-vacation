class BaseAction {
  static result(result) {
    return {
      success: result.success || true,
      status: result.status || 200,
      ...(result.data && { data: result.data })
    }
  }
}

module.exports = { BaseAction }