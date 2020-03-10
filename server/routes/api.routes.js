const express = require('express')
const ApiController = require('../controllers/api.controller')

const router = express.Router()

router.get('/', ApiController.findAll)

router.get('/:id', ApiController.findOne)

router.post('/', ApiController.create)

router.put('/:id', ApiController.update)

router.delete('/:id', ApiController.delete)

module.exports = router
