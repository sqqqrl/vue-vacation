const { v4: uuidv4 } = require('uuid')

class RefreshSessionEntity {
  constructor ({ userId, fingerprint, ip, ua, expiresIn } = {}) {
    this.refreshToken = uuidv4()
    this.userId = userId
    this.fingerprint = fingerprint
    this.ip = ip
    this.expiresIn = expiresIn
    this.ua = ua || null
  }
}

module.exports = { RefreshSessionEntity }
