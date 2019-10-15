import mongoose from 'mongoose';
import { get as getProp, slice } from 'lodash';
import redis from 'redis';
import bluebird from 'bluebird';
import HttpService from '../../services/http.service';
import Device from '../../models/device.model';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const redisClient = redis.createClient({
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || '127.0.0.1',
});

export const PATH_TYPES = {
  PATH: 'path',
  CONSTANT: 'constant',
};

const ApiSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  authMethod: {
    type: String,
    default: 'open',
  },
  url: {
    type: String,
    required: true,
  },
  paths: {},
  dataPath: {
    type: String,
    default: '',
  },
  customHeaders: {},
  requestMethod: {
    type: String,
    default: 'get',
  },
  requestData: {
    type: String,
    default: '',
  },
});
ApiSchema.methods.invoke = async function invokeApi() {
  const cacheResponse = await redisClient.getAsync(this.name);
  if (cacheResponse) {
    return JSON.parse(cacheResponse);
  }

  const client = new HttpService(this.url, this.customHeaders);
  const { data: response } =
    this.requestMethod === 'get'
      ? await client.get()
      : await client.post(this.requestData);

  const data = !this.dataPath ? response : getProp(response, this.dataPath);

  const searchProp = (element, prop) => {
    if (!this.paths[prop]) return undefined;
    return this.paths[prop].type === PATH_TYPES.CONSTANT
      ? this.paths[prop].value
      : getProp(element, this.paths[prop].value);
  };

  const allDevices = data.map((element) => {
    const id = searchProp(element, 'id');
    const organization = searchProp(element, 'organization');
    const reference = searchProp(element, 'reference');
    const longitude = searchProp(element, 'longitude');
    const latitude = searchProp(element, 'latitude');
    const application = searchProp(element, 'application');
    const meta = searchProp(element, 'meta');
    const types = searchProp(element, 'types');
    const categories = searchProp(element, 'categories');
    return new Device({
      id,
      organization,
      reference,
      longitude,
      latitude,
      application,
      meta,
      types,
      categories,
    });
  });
  const apiResponse = slice(allDevices, 0, 5);
  await redisClient.setAsync(this.name, JSON.stringify(apiResponse));
  return apiResponse;
};
const ApiModel = mongoose.model('Api', ApiSchema);

ApiModel.getAll = () => ApiModel.find({});
ApiModel.addApi = (api) => api.save();
ApiModel.removeApi = (name) => ApiModel.remove({ name });

export default ApiModel;
