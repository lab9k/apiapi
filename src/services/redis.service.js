import redis from 'redis';
import bluebird from 'bluebird';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export default new (class {
  constructor() {
    this.client = redis.createClient({
      port: process.env.REDIS_PORT || 6379,
      host: process.env.REDIS_HOST || '127.0.0.1',
    });
    this.expirationTime = 1 * 60 * 60;
  }

  async setData(name, data) {
    await this.client.setAsync(name, data, 'EX', this.expirationTime);
  }

  async getData(name) {
    return this.client.getAsync(name);
  }

  async flushDb() {
    await this.client.flushall();
  }
})();
