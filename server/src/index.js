require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('./config/config')
const controllers = require('./controllersNew')

const app = express()

app.use(cors())
app.use(bodyParser.json())

//db config
const db = require("./models");
const dbConfig = require('./config/db.config')
const Role = db.role;

// mongodb init
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.dbname}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then( async () => {
    console.log("Successfully connect to MongoDB.");
    initial();


    // let adminId = await db.role.findOne({ name: "admin" }, (err, roleObj) => {
    //   if (err) console.log(err);
    //   return roleObj._id
    // })

    // db.user.updateOne({email: "mkpmkp@drydr.kigh"}, { $push: { roles: adminId } }, (err, hand) => {
    //   if (err) console.log(err);
    //   console.log(hand);
    // })

    // db.user.findOne({ email: "mkpmkp@drydr.kigh" }, (err, user) => {
    //   if (err) console.log(err);
    //   console.log(user);
    // })

    
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  })

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) console.log("User role error", err);

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) console.log("Amdin role error", err);

        console.log("added 'admin' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) console.log("Moderator role error", err);

        console.log("added 'moderator' to roles collection");
      });
    }
  });
}


for (const controller of controllers.map(Controller => new Controller())) {
  app.use(controller.router)
}

// require('./routes/index')(app);

app.listen(config.port, () => {
  console.log('Server start on port:' + config.port);
})
