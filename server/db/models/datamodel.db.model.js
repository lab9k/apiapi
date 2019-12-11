const mongoose = require('mongoose')

const DataModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

const DataModelModel = mongoose.model('DataModel', DataModelSchema)

DataModelModel.addDataModel = model => model.save()
DataModelModel.getAll = () => DataModelModel.find({})

module.exports = DataModelModel
