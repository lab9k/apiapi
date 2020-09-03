const express = require('express')
const HttpService = require('../services/http.service')
const apiRoutes = require('./api.routes')
const dataRoutes = require('./data.routes')
const serverRoutes = require('./server.routes')
const collectionRoutes = require('./collection.routes')
const dataModelRoutes = require('./datamodel.routes')
const uploadRoutes = require('./upload.routes')

const router = express.Router()

router.use('/api', apiRoutes)
router.use('/data', dataRoutes)
router.use('/server', serverRoutes)
router.use('/collection', collectionRoutes)
router.use('/models', dataModelRoutes)
router.use('/uploads', uploadRoutes)

/**
 * Used to circumvent CORS issues.
 * To be used behind authentication.
 */
router.get('/proxy/:url', (req, res, next) => {
  const client = new HttpService(Buffer.from(req.params.url, 'base64').toString())
  client.get()
    .then(({ data }) => res.json(data))
    .catch(({ response }) => {
      res.status(response.status)
      res.json(response.statusText)
    })
})

module.exports = router
