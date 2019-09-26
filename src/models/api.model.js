import { get as getProp, slice } from 'lodash';
import HttpService from '../services/http.service';
import Device from './device.model';

export const AUTH_METHODS = {
  OPEN: 'open',
  API_KEY: 'api_key',
  CUSTOM_HEADERS: 'custom_headers',
};

export const PATH_TYPES = {
  PATH: 'path',
  CONSTANT: 'constant',
};

const defaultPathValue = {
  id: {
    type: PATH_TYPES.PATH,
    value: '',
  },
  organization: {
    type: PATH_TYPES.PATH,
    value: '',
  },
  reference: {
    type: PATH_TYPES.PATH,
    value: '',
  },
  application: {
    type: PATH_TYPES.PATH,
    value: '',
  },
  types: {
    type: PATH_TYPES.CONSTANT,
    value: [
      {
        name: '',
        application: '',
        description: '',
      },
    ],
  },
  categories: {
    type: PATH_TYPES.CONSTANT,
    value: [''],
  },
  longitude: {
    type: PATH_TYPES.PATH,
    value: '',
  },
  latitude: {
    type: PATH_TYPES.PATH,
    value: '',
  },
  meta: {
    type: PATH_TYPES.PATH,
    value: '',
  },
};

export default class Api {
  constructor({
    name = '',
    authMethod = AUTH_METHODS.OPEN,
    url = '',
    paths = defaultPathValue,
    dataPath = '',
    customHeaders = {},
    requestMethod = 'get',
    requestData = '',
  }) {
    this.name = name;
    this.authMethod = authMethod;
    this.client = new HttpService(url, customHeaders);
    this.paths = paths;
    this.dataPath = dataPath;
    this.requestMethod = requestMethod;
    this.requestData = requestData;
  }

  async invoke() {
    const { data: response } = this.requestMethod === 'get' ? await this.client.get() : await this.client.post(this.requestData);


    const data = Array.isArray(response)
      ? response
      : getProp(response, this.dataPath);

    const allDevices = data.map((element) => {
      const id = this.searchProp(element, 'id');
      const organization = this.searchProp(element, 'organization');
      const reference = this.searchProp(element, 'reference');
      const longitude = this.searchProp(element, 'longitude');
      const latitude = this.searchProp(element, 'latitude');
      const application = this.searchProp(element, 'application');
      const meta = this.searchProp(element, 'meta');
      const types = this.searchProp(element, 'types');
      const categories = this.searchProp(element, 'categories');

      return new Device({
        id, organization, reference, longitude, latitude, application, meta, types, categories,
      });
    });
    return slice(allDevices, 0, 5);
  }

  set url(value) {
    this.client = new HttpService(value);
  }

  get url() {
    return this.client.url;
  }

  searchProp(element, prop) {
    if (!this.paths[prop]) return undefined;
    return this.paths[prop].type === PATH_TYPES.CONSTANT
      ? this.paths[prop].value : getProp(element, this.paths[prop].value);
  }
}
