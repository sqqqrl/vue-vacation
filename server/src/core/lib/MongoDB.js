const { response } = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

class MongoDB {
  constructor ({ host, port, dbname, logger }) {
    logger.info('MongoDB start initialization...')
    return start({ host, port, dbname, logger })
  }
}

function start ({ host, port, dbname, logger }) {
  return new Promise(async (resolve, reject) => {
    mongoose
      .connect(`mongodb://${host}:${port}/${dbname}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    
    mongoose.connection.on("connected", () => {
      logger.info('Successfully connect to MongoDB...')
      return resolve()
    });

    mongoose.connection.on('error', (err) => {
      return reject(err)
    })
  })
  
}


module.exports = { MongoDB }