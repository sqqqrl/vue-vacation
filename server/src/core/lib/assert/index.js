const { AssertionError } = require('./AssertionError')
const { Rule } = require('../Rule')

const util = require('util')
var { Stream } = require('stream')

const UUID_REGEXP = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const URL_REGEXP = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
const validTypes = [Number, String, Object, Array, Boolean, Function]

function isObject (v) {
  return v && (typeof v === 'object') && !Array.isArray(v)
}

class Assert {
  static fail (actual, expected, message) {
    throw new AssertionError(message || `Failed value: ${util.inspect(actual)}; ${expected !== undefined ? `Expect: ${util.inspect(expected.name || expected)}` : ''}`)
  }

  static validate (value, rule, { required = false } = {}) {
    Assert.instanceOf(rule, Rule)
    const validationResult = rule.validator(value)
    if (!['boolean', 'string'].includes(typeof validationResult)) {
      Assert.fail(validationResult, null, 'Validation result error. Validator should return string or boolean. Please check validation function')
    }

    if (required) {
      if (typeof validationResult === 'string') Assert.fail(value, validationResult)
      if (validationResult === false) Assert.fail(value, rule.description)
    }

    if (value !== undefined && !required) {
      if (typeof validationResult === 'string') Assert.fail(value, validationResult)
      if (validationResult === false) Assert.fail(value, rule.description)
    }
  }

  static instanceOf (value, type, { message = '' } = {}) {
    if (!(value instanceof type)) {
      Assert.fail(value, type, message || `Failed instance: ${util.inspect(value)}; Expect instance of ${util.inspect(type.name || type)} class`)
    }
  }
}

module.exports = { Assert }