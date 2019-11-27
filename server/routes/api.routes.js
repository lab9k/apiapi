const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  // TODO: find all apis
  res.send('Hello World')
})

router.post('/', (req, res) => {
  // TODO: create a new api
})

router.put('/:id', (req, res) => {
  // TODO: update api with id
})

router.delete('/:id', (req, res) => {
  // TODO: delete api
})

module.exports = router
