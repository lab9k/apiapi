const mongoose = require('mongoose')
const { flattenDepth } = require('lodash')
const DataModelModel = require('./datamodel.db.model')
const ApiModel = require('./api.db.model')
const UploadModel = require('./upload.model')

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
  uploads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Upload' }],
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DataModel',
    required: true
  }
})

CollectionSchema.methods.invokeApis = function invokeCollectionApis () {
  return DataModelModel.findById(this.model)
    .exec()
    .then((model) => {
      const apiPromise = ApiModel.find({
        '_id': { $in: this.apis }
      })
        .exec()
        .then((apis) => {
          return Promise.all(apis.map(api => api.invoke(model)))
        })
      const uploadsPromise = UploadModel.find({
        '_id': { $in: this.uploads }
      })
        .exec()
        .then((uploads) => {
          return Promise.all(uploads.map(up => up.invoke()))
        })
      return Promise.all([apiPromise, uploadsPromise])
    }).then(results => flattenDepth(results, 2))
}

const CollectionModel = mongoose.model('Collection', CollectionSchema)

module.exports = CollectionModel
