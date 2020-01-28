const DataModelModel = require('../db/models/datamodel.db.model')

module.exports = {
  findAll (req, res, next) {
    return DataModelModel.getAll().exec().then(result => res.json(result)).catch(next)
  },
  create (req, res, next) {
    const newDataModel = new DataModelModel(req.body)
    DataModelModel.addDataModel(newDataModel).then(doc => res.json(doc)).catch(next)
  },
  delete (req, res, next) {
    const { id } = req.params
    DataModelModel.findByIdAndDelete(id)
      .exec()
      .then(response => res.json(response))
      .catch(err => next(err))
  }
}
