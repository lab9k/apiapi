const { map } = require('lodash')
const ApiModel = require('../db/models/api.db.model')

module.exports = {
  getAll (req, res) {
    ApiModel.getAll().then((allApis) => {
      const resultPromises = map(allApis, api => api.invoke())
      return Promise.all(resultPromises)
    }).then((allResults) => { res.json(allResults) })
  },
  getFromApi (req, res) {
    const { name } = req.params
    ApiModel.find({ name }).then((doc) => {
      doc.invoke().then(result => res.json(result))
    })
  },
  getRawDataFromApi (req, res) {
    const { name } = req.params
    ApiModel.find({ name }).then((api) => {
      api.raw().then(result => res.json(result))
    })
  }
}
