const express = require("express");

module.exports = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  require('./api/auth.routes')(app);
  require('./api/users.routes')(app);
};