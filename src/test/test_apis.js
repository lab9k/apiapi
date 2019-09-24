import Api, { AUTH_METHODS, PATH_TYPES } from '../models/api.model';

const iotRegisterTestApi = new Api({
  name: 'iot-register-api',
  authMethod: AUTH_METHODS.OPEN,
  url: 'http://localhost:1337/devices',
  paths: {
    id: {
      type: PATH_TYPES.PATH,
      value: 'id',
    },
    reference: {
      type: PATH_TYPES.PATH,
      value: 'reference',
    },
    application: {
      type: PATH_TYPES.PATH,
      value: 'application',
    },
    types: {
      type: PATH_TYPES.PATH,
      value: 'types',
    },
    categories: {
      type: PATH_TYPES.PATH,
      value: 'categories',
    },
    longitude: {
      type: PATH_TYPES.PATH,
      value: 'longitude',
    },
    latitude: {
      type: PATH_TYPES.PATH,
      value: 'latitude',
    },
    organization: {
      type: PATH_TYPES.PATH,
      value: 'organization',
    },
    meta: {
      type: PATH_TYPES.PATH,
      value: 'meta',
    },
  },
  dataPath: 'results',
});

const api1 = new Api({
  name: 'quotes',
  authMethod: AUTH_METHODS.OPEN,
  url: 'https://programming-quotes-api.herokuapp.com/quotes',
  paths: {
    id: {
      type: PATH_TYPES.PATH,
      value: '_id',
    },
    organization: {
      type: PATH_TYPES.CONSTANT,
      value: 'Digipolis',
    },
    application: {
      type: PATH_TYPES.CONSTANT,
      value: 'iot-register',
    },
    reference: {
      type: PATH_TYPES.PATH,
      value: 'author',
    },
  },
});
const api2 = new Api({
  name: 'planets',
  authMethod: AUTH_METHODS.OPEN,
  url: 'http://www.asterank.com/api/mpc',
  paths: {
    id: {
      type: PATH_TYPES.PATH,
      value: 'ref',
    },
    organization: {
      type: PATH_TYPES.CONSTANT,
      value: 'Digipolis Gent',
    },
    application: {
      type: PATH_TYPES.PATH,
      value: 'epoch',
    },
    reference: {
      type: PATH_TYPES.PATH,
      value: 'readable_des',
    },
  },
});

export default [
  api1, api2, iotRegisterTestApi,
];
