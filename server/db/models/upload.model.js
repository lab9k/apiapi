const mongoose = require('mongoose')
const { set: setProp } = require('lodash')
const RedisService = require('../../services/redis.service')

const PATH_TYPES = {
  PATH: 'path',
  CONSTANT: 'constant'
}

const UploadSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  data: [{
    type: Object,
    required: true
  }],
  paths: [{
    toPath: {
      type: String
    },
    fromHeader: {
      type: String
    },
    pathType: {
      type: String,
      enum: [PATH_TYPES.CONSTANT, PATH_TYPES.PATH],
      default: PATH_TYPES.CONSTANT
    },
    constValue: {
      type: String,
      default: ''
    }
  }]
})

UploadSchema.methods.invoke = function invokeUpload () {
  return RedisService.getData(`${this._id}`).then((cachedResponse) => {
    if (cachedResponse) {
      return JSON.parse(cachedResponse)
    }

    const mappedData = this.data.map((entry) => {
      return this.paths.reduce((acc, { toPath, fromHeader, pathType, constValue }) => {
        if (pathType === PATH_TYPES.CONSTANT) {
          setProp(acc, toPath, constValue)
        } else if (pathType === PATH_TYPES.PATH) {
          setProp(acc, toPath, entry[fromHeader])
        }

        return acc
      }, {})
    })
    RedisService.setData(`${this._id}`, JSON.stringify(mappedData))
    return mappedData
  })
}

const UploadModel = mongoose.model('Upload', UploadSchema)

module.exports = UploadModel
