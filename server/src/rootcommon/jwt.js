const jwt = require('jsonwebtoken')

function jwtVerify (token, SECRET) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, (error, decoded) => {
      if (error) {
        return reject({message: error.message })
      }
      return resolve(decoded)
    })
  })
}

function jwtSign(payload, SECRET, options) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET, options, (error, token) => {
      if (error) return reject({ message: error.message })
      return resolve(token)
    })
  })
}

module.exports = { jwtVerify, jwtSign }