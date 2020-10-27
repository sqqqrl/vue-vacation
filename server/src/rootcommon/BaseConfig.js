const joi = require('joi')
require('dotenv').config()


class BaseConfig {
  set (env, validator, defaultVal) {
    let value
    if (process.env[env] || (process.env[env] === '')) {
      value = process.env[env]
    } else {
      if (defaultVal === undefined) {
        throw new Error(`Missing default value "${env}".`)
      }
      value = defaultVal
    }

    // if (validator && (typeof validator === 'function' || typeof validator === 'object')) {
    //   if (typeof validator === 'object') { // joi object
    //     const joiResult = validator.validate(value)
    //     if (!joiResult.error) return value
    //     throw new Error(`Wrong "${env}" variable; Value: "${value}" is invalid. ${joiResult.error}`)
    //   }

    //   if (!validator(value)) {
    //     throw new Error(`Wrong "${env}" variable; Value: "${value}" is invalid.`)
    //   }

    return value
    // }

    // throw new Error('validator should be a function or joi rule.')
  }

  get joi () {
    return joi
  }
}

module.exports = { BaseConfig }
