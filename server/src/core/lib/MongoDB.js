const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

class MongoDB {
  constructor ({ host, port, dbname, dbuser, dbpassword, logger }) {
    logger.info('MongoDB start initialization...')
    return start({ host, port, dbname, dbuser, dbpassword, logger })
  }
}

function start ({ host, port, dbname, dbuser, dbpassword, logger }) {
  return new Promise(async (resolve, reject) => {
    mongoose
      .connect(`mongodb://${host}:27017/${dbname}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    
    mongoose.connection.on("connected", () => {
      logger.info('Successfully connect to MongoDB...')
      return resolve()
    });

    mongoose.connection.on('error', ( err ) => {
      return reject(err)
    })
  })
}


module.exports = { MongoDB }