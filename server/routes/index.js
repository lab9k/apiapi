const express = require('express')
const apiRoutes = require('./api.routes')
const dataRoutes = require('./data.routes')
const serverRoutes = require('./server.routes')
const datamodelRoutes = require('./datamodel.routes')

const router = express.Router()

router.use('/api', apiRoutes)
router.use('/data', dataRoutes)
router.use('/server', serverRoutes)
router.use('/datamodel', datamodelRoutes)

module.exports = router
