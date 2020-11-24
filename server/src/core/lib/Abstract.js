class Abstract {
  __abstractField (ctx, fieldName) {
    if (!ctx[fieldName]) {
      throw new Error(`${ctx.constructor.name}: ${fieldName} field not implemented`)
    }
  }

  __abstractMethod (ctx, methodName, argsQuantity) {
    if (!ctx[methodName]) {
      throw new Error(`${ctx.constructor.name}: ${methodName} method not implemented`)
    }

    if (ctx[methodName].length !== argsQuantity) {
      throw new Error(`${ctx.constructor.name}: ${methodName} method invalid arguments length`)
    }
  }
}

module.exports = { Abstract }
