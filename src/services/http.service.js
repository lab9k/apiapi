import Axios from 'axios';

export default class HttpService {
  constructor(url) {
    this.client = Axios.create({ baseURL: url });
  }

  get url() {
    return this.client.defaults.baseURL;
  }

  set url(value) {
    this.client = Axios.create({ url: value });
  }

  async get() {
    return this.client.get();
  }

  async post(data) {
    return this.client.post(this.url, data);
  }

  async patch(data) {
    return this.client.patch(this.url, data);
  }

  async delete() {
    return this.client.delete(this.url);
  }

  async put(data) {
    return this.client.put(this.url, data);
  }
}
