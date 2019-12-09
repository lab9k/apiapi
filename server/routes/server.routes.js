const express = require('express')
const ServerController = require('../controllers/server.controller')

const router = express.Router()

router.post('/flush', ServerController.flushCache)

module.exports = router
