const axios = require('axios')

module.exports = class HttpService {
  constructor (url, headers) {
    this.client = axios.create({ baseURL: url, headers })
    this.client.defaults.headers.common = { ...this.client.defaults.headers.common, ...headers }
  }

  get url () {
    return this.client.defaults.baseURL
  }

  get () {
    return this.client.get(this.url)
  }

  post (data) {
    return this.client.post(this.url, data)
  }

  patch (data) {
    return this.client.patch(this.url, data)
  }

  delete () {
    return this.client.delete(this.url)
  }

  put (data) {
    return this.client.put(this.url, data)
  }
}
