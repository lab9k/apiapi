const express = require('express')
const UploadsController = require('../controllers/upload.controller')

const router = express.Router()

router.post('/', UploadsController.createOne)

module.exports = router
