const { map, flatten } = require('lodash')
const ApiModel = require('../db/models/api.db.model')

module.exports = {
  getAll (req, res, next) {
    return ApiModel.getAll().then((allApis) => {
      const resultPromises = map(allApis, api => api.invoke())
      return Promise.all(resultPromises)
    }).then(allResults => res.json(flatten(allResults))).catch(next)
  },
  getFromApi (req, res, next) {
    const { id } = req.params
    ApiModel.findById(id).then((doc) => {
      doc.invoke().then(result => res.json(result))
    }).catch(next)
  },
  getRawDataFromApi (req, res, next) {
    const { id } = req.params
    ApiModel.findById(id).then((api) => {
      api.raw().then(result => res.json(result))
    }).catch(next)
  }
}
