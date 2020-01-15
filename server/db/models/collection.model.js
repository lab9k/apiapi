const mongoose = require('mongoose')

const CollectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  apis: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Api' }]
})

const CollectionModel = mongoose.model('Collection', CollectionSchema)

module.exports = CollectionModel
