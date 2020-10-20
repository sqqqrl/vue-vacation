const db = require("../models");
const User = db.user;

exports.getUsers = (req, res) => {
  User.find((err, users) => {
    if (err) res.status(500).send({message: "Something goes wrong"});

    return res.status(200).send(users)
  })
}