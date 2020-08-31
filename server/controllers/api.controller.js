const ApiModel = require('../db/models/api.db.model')
const CollectionModel = require('../db/models/collection.model')

module.exports = {
  findAll (req, res, next) {
    ApiModel.getAll().then((allApis) => {
      res.json(allApis)
    }).catch(next)
  },
  findOne (req, res, next) {
    const { id } = req.params
    ApiModel.findById(id).then((doc) => {
      res.json(doc)
    }).catch(next)
  },
  create (req, res, next) {
    const { forCollection } = req.body
    const api = new ApiModel(req.body)
    return CollectionModel.updateOne({ _id: forCollection }, { $push: { apis: api } })
      .exec()
      .then(() => {
        return api.save()
      }).then(doc => res.json(doc))
      .catch(next)
  },
  update (req, res, next) {
    const { body } = req
    const { id } = req.params
    ApiModel.replaceOne({ _id: id }, body).then((doc) => {
      res.json(doc)
    }).catch(next)
  },
  delete (req, res, next) {
    const { id } = req.params
    ApiModel.findByIdAndDelete(id).then((response) => {
      res.json(response)
    }).catch(next)
  }
}
