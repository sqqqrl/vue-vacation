const { BaseConfig } = require('../rootcommon/BaseConfig')

class TokenConfig extends BaseConfig {
  constructor () {
    super()

    this.access = {
      type: 'TOKEN_TYPE_ACCESS',
      secret: this.set('TOKEN_ACCESS_SECRET', this.joi.string().min(30).max(100).required()),
      expiresIn: this.set('TOKEN_ACCESS_EXP', this.joi.string().regex(expiresInRegexp).required()),
      clear () {
        return {
          type: this.type,
          secret: `${this.secret.substr(0, 1)}****${this.secret.substr(this.secret.length - 1)}`,
          expiresIn: this.expiresIn
        }
      }
    }
    
  }
}

module.exports = new TokenConfig()