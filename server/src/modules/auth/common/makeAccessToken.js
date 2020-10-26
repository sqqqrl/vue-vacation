const SECRET = require('../../../config').token.access.secret

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