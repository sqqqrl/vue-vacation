const bcrypt = require('bcryptjs')
const { assert } = require('server-core')

/**
 * @return {Promise} string
 */
function makePasswordHash(password) {
    assert.string(password, { notEmpty: true })

    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return reject(err)

            bcrypt.hash(password, salt, (err, hash) => {
                if (err) return reject(err)
                return resolve(hash)
            })
        })
    })
}

module.exports = { makePasswordHash }