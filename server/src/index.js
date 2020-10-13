const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('./config/config')

const app = express()

app.use(cors())
app.use(bodyParser.json())

// mongodb init
const MongoClient = require('mongodb').MongoClient
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true }, { useUnifiedTopology: true });
// connect
mongoClient.connect(function(err, client){
  if(err) return console.log(err);
  const db = client.db("testM");
  require('./routes')(app, db)
  app.listen(config.port, () => {
    console.log(`Server is running on port" ${config.port}`);
  })
});



