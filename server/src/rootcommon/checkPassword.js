const bcrypt = require('bcryptjs')

function checkPassword (password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (error, result) => {
      if (error) return reject(error)
      if (!result) return reject({ message: "Invalid password" })
      return resolve(result)
    })
  })
}

module.exports = { checkPassword }