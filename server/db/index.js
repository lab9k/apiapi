const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const connectToDb = (url) => {
  if (!url) {
    throw new Error('Mongodb database url was not defined')
  }

  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
}

module.exports.connectToDb = connectToDb
