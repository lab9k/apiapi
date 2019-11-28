const mongoose = require('mongoose')
const getProp = require('lodash/get')
const HttpService = require('../../services/http.service')
const Device = require('./device.model')

const PATH_TYPES = {
  PATH: 'path',
  CONSTANT: 'constant'
}

const defaultPathValue = {
  id: {
    type: PATH_TYPES.PATH,
    value: ''
  },
  organization: {
    type: PATH_TYPES.PATH,
    value: ''
  },
  reference: {
    type: PATH_TYPES.PATH,
    value: ''
  },
  application: {
    type: PATH_TYPES.PATH,
    value: ''
  },
  types: {
    type: PATH_TYPES.CONSTANT,
    value: [
      {
        name: '',
        application: '',
        description: ''
      }
    ]
  },
  categories: {
    type: PATH_TYPES.CONSTANT,
    value: ['']
  },
  longitude: {
    type: PATH_TYPES.PATH,
    value: ''
  },
  latitude: {
    type: PATH_TYPES.PATH,
    value: ''
  },
  meta: {
    type: PATH_TYPES.PATH,
    value: ''
  }
}

module.exports.PATH_TYPES = PATH_TYPES

const ApiSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  authMethod: {
    type: String,
    default: 'open'
  },
  url: {
    type: String,
    required: true
  },
  paths: {
    required: true,
    default: defaultPathValue,
    type: Object
  },
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
  }
})

ApiSchema.methods.raw = function getRawData () {
  const { data: response } =
    this.requestMethod === 'get'
      ? this.client.get()
      : this.client.post(this.requestData)
  return response
}

ApiSchema.methods.invoke = function invokeApi () {
  const client = new HttpService(this.url, this.customHeaders)
  const prom = this.requestMethod === 'get'
    ? client.get()
    : client.post(this.requestData)

  return prom.then(({ data: response }) => {
    const data = !this.dataPath ? response : getProp(response, this.dataPath)

    const searchProp = (element, prop) => {
      if (!this.paths[prop]) { return undefined }
      return this.paths[prop].type === PATH_TYPES.CONSTANT
        ? this.paths[prop].value
        : getProp(element, this.paths[prop].value)
    }
    return data.map((element) => {
      const id = searchProp(element, 'id')
      const organization = searchProp(element, 'organization')
      const reference = searchProp(element, 'reference')
      const longitude = searchProp(element, 'longitude')
      const latitude = searchProp(element, 'latitude')
      const application = searchProp(element, 'application')
      const meta = searchProp(element, 'meta')
      const types = searchProp(element, 'types')
      const categories = searchProp(element, 'categories')
      return new Device({
        id,
        organization,
        reference,
        longitude,
        latitude,
        application,
        meta,
        types,
        categories
      })
    })
  })
}

const ApiModel = mongoose.model('Api', ApiSchema)
ApiModel.getAll = () => ApiModel.find({})
ApiModel.addApi = api => api.save()
ApiModel.removeApi = name => ApiModel.deleteOne({ name })

module.exports = ApiModel
