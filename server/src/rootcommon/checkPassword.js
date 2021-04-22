const bcrypt = require('bcryptjs')
const { errorCodes, AppError } = require('server-core')

function checkPassword (password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (error, result) => {
      if (error) return reject(error)
      if (!result) return reject(new AppError({ ...errorCodes.INVALID_PASSWORD }))
      return resolve(result)
    })
  })
}

module.exports = { checkPassword }