const { assert } = require('server-core')
const { RefreshSessionDAO } = require('../../../dao/RefreshSessionDAO')
const { RefreshSessionEntity } = require('./RefreshSessionEntity')

const MAX_REFRESH_SESSIONS_COUNT = 5

async function addRefreshSession (refreshSession) {
  assert.instanceOf(refreshSession, RefreshSessionEntity)

  if (await _isValidSessionsCount(refreshSession.userId)) {
    await _addRefreshSession(refreshSession)
  } else {
    await _wipeAllUserRefreshSessions(refreshSession.userId)
    await _addRefreshSession(refreshSession)
  }
}

async function _isValidSessionsCount (userId) {
  const existingSessionsCount = await RefreshSessionDAO.baseGetCount({ userId })
  return existingSessionsCount < MAX_REFRESH_SESSIONS_COUNT
}

async function _addRefreshSession (refreshSession) {
  await RefreshSessionDAO.baseCreate(refreshSession)
}

async function _wipeAllUserRefreshSessions (userId) {
  return await RefreshSessionDAO.baseRemoveWhere({ userId })
}

module.exports = { addRefreshSession }
