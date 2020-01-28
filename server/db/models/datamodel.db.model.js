const mongoose = require('mongoose')
mongoose.Schema.Types.String.checkRequired(v => v != null)

const DataModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  paths: [
    {
      path: {
        type: String,
        required: true
      },
      hint: {
        type: String,
        required: true
      },
      default: {
        type: String,
        required: true
      }
    }
  ]
})

const DataModelModel = mongoose.model('DataModel', DataModelSchema)

DataModelModel.addDataModel = model => model.save()
DataModelModel.getAll = () => DataModelModel.find({})

module.exports = DataModelModel
