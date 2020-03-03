const mongoose = require('mongoose')
const { flatten } = require('lodash')
const DataModelModel = require('./datamodel.db.model')
const ApiModel = require('./api.db.model')

const CollectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  apis: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Api' }],
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DataModel',
    required: true
  }
})

CollectionSchema.methods.invokeApis = function invokeCollectionApis () {
  return DataModelModel.findById(this.model).exec().then((model) => {
    return ApiModel.find({
      '_id': { $in: this.apis }
    })
      .exec()
      .then((apis) => {
        return Promise.all(apis.map(api => api.invoke(model)))
      })
  }).then(results => flatten(results))
}

const CollectionModel = mongoose.model('Collection', CollectionSchema)

module.exports = CollectionModel
