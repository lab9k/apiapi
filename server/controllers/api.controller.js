const flatten = require('lodash/flatten')
const ApiModel = require('../db/models/api.db.model')

module.exports = {
  findAll (req, res) {
    ApiModel.getAll().then((allApis) => {
      res.json(allApis)
    }).catch((err) => {
      res.status(500).json({ err: err.message })
    })
  },
  findOne (req, res) {
    const name = req.params.name
    ApiModel.find({ name }).then((doc) => {
      res.json(doc)
    }).catch((err) => {
      res.status(500).json({ err: err.message })
    })
  },
  create (req, res) {
    const newApi = new ApiModel(req.body)
    ApiModel.addApi(newApi).then((doc) => {
      res.json(doc)
    }).catch((err) => {
      res.status(500).json({ err: err.message })
    })
  },
  update (req, res) {
    const { body } = req
    const { name } = req.params
    ApiModel.replaceOne({ name }, body).then((doc) => {
      res.json(doc)
    }).catch((err) => {
      res.status(500).json({ err: err.message })
    })
  },
  delete (req, res) {
    const { name } = req.params
    ApiModel.removeApi(name).then((response) => {
      res.json(response)
    }).catch((err) => {
      res.status(500).json({ err: err.message })
    })
  },
  invokeAll (req, res) {
    ApiModel.getAll().then((allApis) => {
      Promise.all(allApis.map(api => api.invoke())).then((data) => { res.json(flatten(data)) })
    })
  }
}
