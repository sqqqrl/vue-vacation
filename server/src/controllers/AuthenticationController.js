const jwt = require('jsonwebtoken')

module.exports = {
  async register(db, req, res) {
    if (req.body) {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }
  
      db.collection('kek').insertOne(user, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          const token = jwt.sign({ user }, 'the_secret_key')
          res.json({
            token,
            email: user.email,
            name: user.name
          })
        }
      })
    } else {
      res.sendStatus(400)
    }
  },

  async login(db, req, res) {
    const body = req.body || {};

    if (body.email !== undefined && body.password !== undefined) {
      const user = {
        email: req.body.email,
        password: req.body.password
      }

      db.collection('kek').findOne({ email: user.email }, (err, user) => {
        if (!user) return res.status(401).send({ msg: "incorrect information" });
      })
    }
  }
}