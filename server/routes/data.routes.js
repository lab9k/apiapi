const express = require('express')
const DataController = require('../controllers/data.controller')

const router = express.Router()

router.get('/', DataController.getAll)
router.get('/raw/:name', DataController.getRawDataFromApi)
router.get('/:name', DataController.getFromApi)

module.exports = router
