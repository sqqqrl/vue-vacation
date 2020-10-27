const token = require('./token')

// const asyncConfigs = [
//   token
// ]

// function rootInit () {
//   return new Promise(async (resolve, reject) => {
//     for (const config of asyncConfigs) {
//       try {
//         await config.init()
//       } catch (e) {
//         return reject(e)
//       }
//     }
//     resolve()
//   })
// }

module.exports = {
  token
}