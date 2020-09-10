const express = require('express')
const UploadsController = require('../controllers/upload.controller')

const router = express.Router()

router.post('/:id', UploadsController.createOne)
router.put('/:id', UploadsController.updateOne)
router.get('/', UploadsController.getAll)
router.get('/:id', UploadsController.getOne)
router.delete('/:id', UploadsController.deleteOne)

module.exports = router
