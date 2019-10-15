import { flatten } from 'lodash';
import ApiModel from '../db/models/api.db.model';
import Api from '../models/api.model';

export default {
  async findAll() {
    const apis = await ApiModel.getAll();
    return apis;
  },
  async create(ctx) {
    const api = new Api(ctx.request.body);
    const storedApi = new ApiModel(api);
    await ApiModel.addApi(storedApi);
    ctx.body = { ...api };
  },
  async invokeAll() {
    const apis = await this.findAll();
    const result = await Promise.all(apis.map((api) => api.invoke()));
    return flatten(result);
  },
};
