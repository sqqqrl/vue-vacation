class AppError extends Error {
  constructor (options) {
    if (!options || !options.description) throw new Error('description param required')

    super()
    this.description = options.description || undefined // default error description from errorCodes
    this.message = options.message || this.description // message thrown by error
    this.status = options.status || 500
    this.code = options.code || 'UNEXPECTED_ERROR'
    this.layer = options.layer || undefined
  }
}

module.exports = { AppError }
