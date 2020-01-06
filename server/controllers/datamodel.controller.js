const DataModelModel = require('../db/models/datamodel.db.model')

module.exports = {
  findAll (req, res, next) {
    return DataModelModel.getAll().exec().then(result => res.json(result)).catch(next)
  },
  create (req, res, next) {
    const newDataModel = new DataModelModel(req.body)
    DataModelModel.addDataModel(newDataModel).then(doc => res.json(doc)).catch(next)
  }
}
