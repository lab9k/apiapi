const CollectionModel = require('../db/models/collection.model')
const UploadModel = require('../db/models/upload.model')

module.exports = {
  createOne (req, res, next) {
    const { id } = req.params

    const upload = new UploadModel(req.body)
    upload.save((err, doc) => {
      if (err) {
        console.log(err)
        return
      }
      return CollectionModel.updateOne(
        { _id: id },
        { $push: { uploads: doc } })
        .exec()
        .then(result => res.json(result))
    })
  },
  getAll (req, res, next) {
    return UploadModel
      .find()
      .exec()
      .then(docs => res.json(docs))
      .catch(err => next(err))
  },
  deleteOne (req, res, next) {
    const { id } = req.params
    return UploadModel
      .deleteOne({ _id: id })
      .exec()
      .then(docs => res.json(docs))
      .catch(err => next(err))
  },
  getOne (req, res, next) {
    const { id } = req.params
    return UploadModel
      .findOne({ _id: id })
      .exec()
      .then(docs => res.json(docs))
      .catch(err => next(err))
  },
  updateOne (req, res, next) {
    const { id } = req.params
    return UploadModel
      .updateOne({ _id: id }, req.body)
      .exec()
      .then(docs => res.json(docs))
      .catch(err => next(err))
  }
}
