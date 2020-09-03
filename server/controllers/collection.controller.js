const CollectionModel = require('../db/models/collection.model')

module.exports = {
  findAll (req, res, next) {
    return CollectionModel.find({})
      .exec()
      .then(results => res.json(results))
      .catch(err => next(err))
  },
  findById (req, res, next) {
    const { id } = req.params
    return CollectionModel.findById(id)
      .populate('apis')
      .populate('model')
      .populate('uploads')
      .exec()
      .then(result => res.json(result))
      .catch(err => next(err))
  },
  create (req, res, next) {
    const newCollection = new CollectionModel(req.body)
    newCollection.save()
      .then(doc => res.json(doc))
      .catch(err => next(err))
  },
  updateOne (req, res, next) {
    const { body, params: { id } } = req
    CollectionModel.replaceOne({ _id: id }, body)
      .exec()
      .then(doc => res.json(doc))
      .catch(err => next(err))
  },
  deleteOne (req, res, next) {
    const { id } = req.params
    CollectionModel.findByIdAndDelete(id)
      .exec()
      .then(response => res.json(response))
      .catch(err => next(err))
  }
}
