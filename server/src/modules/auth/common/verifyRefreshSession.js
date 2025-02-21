const { errorCodes, AppError, assert } = require('server-core')
const { RefreshSessionEntity } = require('./RefreshSessionEntity')

function verifyRefreshSession (oldRefreshSession, newFingerprint) {
  assert.instanceOf(oldRefreshSession, RefreshSessionEntity)
  assert.string(newFingerprint, { notEmpty: true })

  return new Promise((resolve, reject) => {
    const nowTime = new Date().getTime()

    if (nowTime > oldRefreshSession.expiresIn) return reject(new AppError({ ...errorCodes.SESSION_EXPIRED }))
    // if (oldIp !== newIp) return reject(new AppError({ ...errorCodes.INVALID_REFRESH_SESSION })) // for best security
    if (oldRefreshSession.fingerprint !== newFingerprint) return reject(new AppError({ ...errorCodes.INVALID_REFRESH_SESSION }))
    return resolve()
  })
}

module.exports = { verifyRefreshSession }
