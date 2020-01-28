const express = require('express')
const DataModelController = require('../controllers/datamodel.controller')

const router = express.Router()

router.get('/', DataModelController.findAll)
router.post('/', DataModelController.create)
router.delete('/:id', DataModelController.delete)

module.exports = router
