const RedisService = require('../services/redis.service')

module.exports = {
  flushCache (req, res) {
    RedisService.flushDb().then((result) => {
      return res.json({ ok: 1, result })
    }).catch(err => res.json({ ok: 0, ...err }))
  }
}
