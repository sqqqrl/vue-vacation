const AuthenticationController = require('./controllers/AuthenticationController')

module.exports = (app, db) => {
  app.post('/register', (req, res) => {
    AuthenticationController.register(db, req, res)
  })

  app.post('/login', (req, res) => {
    AuthenticationController.login(db, req, res)
  })
}