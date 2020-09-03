const mongoose = require('mongoose')
const { get: getProp, set: setProp } = require('lodash')
const RedisService = require('../../services/redis.service')
const HttpService = require('../../services/http.service')

const PATH_TYPES = {
  PATH: 'path',
  CONSTANT: 'constant'
}

module.exports.PATH_TYPES = PATH_TYPES

const ApiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  authMethod: {
    type: String,
    default: 'open'
  },
  url: {
    type: String,
    required: true
  },
  paths: [{
    toPath: {
      // ? name of the path key
      type: String
    },
    type: {
      // ? constant or path
      type: String,
      enum: [PATH_TYPES.CONSTANT, PATH_TYPES.PATH],
      default: PATH_TYPES.CONSTANT
    },
    value: {
      // ? path to fetch from OR const data to put in
      type: String,
      default: ''
    }
  }],
  dataPath: {
    type: String,
    default: ''
  },
  customHeaders: {},
  requestMethod: {
    type: String,
    default: 'get'
  },
  requestData: {
    type: String,
    default: ''
  },
  meta: { type: Object, default: {} },
  categories: { type: Array, default: [] },
  types: { type: Array, default: [] }
})

ApiSchema.methods.raw = async function getRawData () {
  const client = new HttpService(this.url, this.customHeaders)
  const { data } = this.requestMethod === 'get'
    ? await client.get()
    : await client.post(this.requestData)
  return data
}

ApiSchema.methods.invoke = function invokeApi (model) {
  return RedisService.getData(this.name).then((cachedResponse) => {
    if (cachedResponse) {
      return JSON.parse(cachedResponse)
    }
    const client = new HttpService(this.url, this.customHeaders)
    const prom = this.requestMethod === 'get'
      ? client.get()
      : client.post(this.requestData)

    return prom.then(({ data: response }) => {
      const data = !this.dataPath ? response : getProp(response, this.dataPath)

      const allData = data.map((rawDataElement) => {
        // rawDataElement = data element coming from api
        // should be mapped to an object which paths come from model

        return this.paths.reduce((acc, { toPath: pathName, value: pathValue, type: pathType }) => {
          if (pathType === PATH_TYPES.CONSTANT) {
            setProp(acc, pathName, pathValue)
          } else if (pathType === PATH_TYPES.PATH) {
            const fetchedData = getProp(rawDataElement, pathValue)
            setProp(acc, pathName, fetchedData)
          }
          return acc
        }, {})
      })
      RedisService.setData(this.name, JSON.stringify(allData))
      return allData
    })
  })
}

const ApiModel = mongoose.model('Api', ApiSchema)
ApiModel.getAll = () => ApiModel.find({})
ApiModel.addApi = api => api.save()

module.exports = ApiModel
