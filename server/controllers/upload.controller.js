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
  }
}
