const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

const { connectToDb } = require('./db')
const routes = require('./routes')

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(morgan('combined'))
  app.use((req, res, next) => {
    const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/apiapi'
    connectToDb(url)
      .then(() => {
        next()
      })
      .catch(next)
  })
  app.use('/api', routes)
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
