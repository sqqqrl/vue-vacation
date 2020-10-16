const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('./config/config')

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
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
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
  })
}

require('./routes/auth.routes')(app);
app.listen(config.port, () => {
  console.log('Server start on port:' + config.port);
})


