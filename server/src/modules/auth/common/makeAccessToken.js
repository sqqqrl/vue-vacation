const SECRET = require('../../../config').token.access.secret
const expiresIn = require('../../../config').token.access.expiresIn
const type = require('../../../config').token.access.type
const iss = require('../../../config').token.jwtIss

function makeAccessToken (userEntity) {
  let config = {
    payload: {
      tokenType: type,
      username: userEntity.name,
      userRole: userEntity.role,
      email: userEntity.email,
      iss
    },

    options: {
      algorithm: 'HS512',
      subject: userEntity.id,
      expiresIn
    }
  }

  return jwtSign(config.payload, SECRET, config.options)
}

module.exports = { makeAccessToken }