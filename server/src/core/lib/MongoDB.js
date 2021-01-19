const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

class MongoDB {
  constructor ({ host, port, dbname, dbuser, dbpassword, logger }) {
    logger.info('MongoDB start initialization...')
    return start({ host, port, dbname, dbuser, dbpassword, logger })
  }
}

function start ({ host, port, dbname, dbuser, dbpassword, logger }) {
  console.log(`mongodb://${dbuser}:${dbpassword}@${host}/${dbname}?retryWrites=true&w=majority`)
  return new Promise(async (resolve, reject) => {
    mongoose
    // mongodb://username:password@host:port/database?options...
      .connect(`mongodb://${dbuser}:${dbpassword}@${host}/${dbname}?retryWrites=true&w=majority`, {
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