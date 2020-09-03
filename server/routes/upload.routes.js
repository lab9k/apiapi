const express = require('express')
const UploadsController = require('../controllers/upload.controller')

const router = express.Router()

router.post('/:id', UploadsController.createOne)

module.exports = router
