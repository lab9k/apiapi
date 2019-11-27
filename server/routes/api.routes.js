const express = require('express')
const ApiController = require('../controllers/api.controller')

const router = express.Router()

router.get('/', ApiController.findAll)

router.get('/:name', ApiController.findOne)

router.post('/', ApiController.create)

router.put('/:name', ApiController.update)

router.delete('/:name', ApiController.delete)

module.exports = router
