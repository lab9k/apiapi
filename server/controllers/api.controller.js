const ApiModel = require('../db/models/api.db.model')

module.exports = {
  findAll (req, res, next) {
    ApiModel.getAll().then((allApis) => {
      res.json(allApis)
    }).catch(next)
  },
  findOne (req, res, next) {
    const name = req.params.name
    ApiModel.find({ name }).then((doc) => {
      res.json(doc)
    }).catch(next)
  },
  create (req, res, next) {
    const newApi = new ApiModel(req.body)
    newApi.meta = newApi.paths.meta
    ApiModel.addApi(newApi).then((doc) => {
      res.json(doc)
    }).catch(next)
  },
  update (req, res, next) {
    const { body } = req
    const { name } = req.params
    ApiModel.replaceOne({ name }, body).then((doc) => {
      res.json(doc)
    }).catch(next)
  },
  delete (req, res, next) {
    const { name } = req.params
    ApiModel.removeApi(name).then((response) => {
      res.json(response)
    }).catch(next)
  }
}
