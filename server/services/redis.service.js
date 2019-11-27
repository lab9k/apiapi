const redis = require('redis')
const bluebird = require('bluebird')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

class RedisClient {
  constructor () {
    this.client = redis.createClient({
      port: process.env.REDIS_PORT || 6379,
      host: process.env.REDIS_HOST || '127.0.0.1'
    })
    this.expirationTime = 60 * 60 // 1 hour
  }

  setData (name, data) {
    return this.client.setAsync(name, data, 'EX', this.expirationTime)
  }

  getData (name) {
    return this.client.getAsync(name)
  }

  flushDb () {
    return this.client.flushall()
  }
}

module.exports = new RedisClient()
