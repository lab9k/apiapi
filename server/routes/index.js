const express = require('express')
const apiRoutes = require('./api.routes')
const dataRoutes = require('./data.routes')

const router = express.Router()

router.use('/api', apiRoutes)
router.use('/data', dataRoutes)

module.exports = router
