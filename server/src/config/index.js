const app = require('./app')
const mongo = require('./mongo')
const token = require('./token')

const asyncConfigs = [
  app,
  token,
  mongo
]

function rootInit () {
  return new Promise(async (resolve, reject) => {
    for (const config of asyncConfigs) {
      try {
        await config.init()
      } catch (e) {
        return reject(e)
      }
    }
    resolve()
  })
}

module.exports = {
  app,
  token,
  mongo,
  rootInit
}
