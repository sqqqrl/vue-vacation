const { DevErrorMiddleware } = require('./DevErrorMiddleware')

//TODO: when the production config will be added
// module.exports = process.env.NODE_ENV !== 'production' ? DevErrorMiddleware : ProdErrorMiddleware

module.exports = DevErrorMiddleware