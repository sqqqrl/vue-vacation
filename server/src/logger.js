const { Logger } = require('server-core')
const sentryDsn = process.env.SENTRY_DSN
const isDev = process.env.NODE_ENV === 'development'

module.exports = new Logger({
  appName: 'vacation',
  raw: !isDev,
  ...(!isDev && { capture: true, sentryDsn })
})
