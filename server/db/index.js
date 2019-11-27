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
  }).then(() => {
    console.log('Connected to mongo')
  }).catch((err) => {
    console.error(err)
  })
}

module.exports.connectToDb = connectToDb
