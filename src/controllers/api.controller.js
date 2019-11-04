import { flatten } from 'lodash';
import ApiModel from '../db/models/api.db.model';
import Api from '../models/api.model';

export default {
  async findAll() {
    const apis = await ApiModel.getAll();
    return apis;
  },
  async create(body) {
    const api = new Api(body);
    const storedApi = new ApiModel(api);
    await ApiModel.addApi(storedApi);
    return { ...api };
  },
  async find(name) {
    const api = await ApiModel.find({ name });
    return api;
  },
  async update(name, body) {
    return ApiModel.replaceOne({ name }, body);
  },
  async delete(name) {
    return ApiModel.removeApi(name);
  },
  async invokeAll() {
    const apis = await this.findAll();
    const result = await Promise.all(apis.map((api) => api.invoke()));
    return flatten(result);
  },
};
