const mongoose = require('mongoose')
export const connectToDb = (url) => {
  if (!url) {
    throw new Error('Mongodb database url was not defined')
  }
}
