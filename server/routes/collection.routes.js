const express = require('express')
const CollectionController = require('../controllers/collection.controller')

const router = express.Router()

router.get('/', CollectionController.findAll)
router.post('/', CollectionController.create)
router.get('/:id', CollectionController.findById)
router.put('/:id', CollectionController.updateOne)
router.delete('/:id', CollectionController.deleteOne)

module.exports = router
