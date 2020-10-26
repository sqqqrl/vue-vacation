const joi = require('@hapi/joi')


class BaseConfig {
  get joi () {
    return joi
  }
}

module.exports = { BaseConfig }
