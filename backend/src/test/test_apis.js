import Api, { AUTH_METHODS, PATH_TYPES } from '../models/api.model';

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
  name: 'luftdaten temp',
  url: 'https://maps.luftdaten.info/data/v2/data.temp.min.json',
  authMethod: AUTH_METHODS.OPEN,
  paths: {
    id: {
      type: PATH_TYPES.PATH,
      value: 'id',
    },
    latitude: {
      type: PATH_TYPES.PATH,
      value: 'location.latitude',
    },
    longitude: {
      type: PATH_TYPES.PATH,
      value: 'location.longitude',
    },
    organization: {
      type: PATH_TYPES.CONSTANT,
      value: 'luftdaten',
    },
    application: {
      type: PATH_TYPES.PATH,
      value: 'sensor.sensor_type.name',
    },
  },
});

const citymeshApi = new Api({
  name: 'citymesh',
  url: 'https://footfall-api.wifilab.be/',
  authMethod: AUTH_METHODS.CUSTOM_HEADERS,
  requestMethod: 'post',
  requestData: {
    query: `
    query {
      locations {
        id
        name
        position {
          coordinates
          type
        }
      }
    }`,
  },
  customHeaders: {
    Authorization:
      'eyJhbGciOiJIUzI1NiJ9.Z2VudA.MCB1pnqeYgOlixDNRUERJG3F656eyJTsYG8ORo6yl3g',
    Client: 'gent',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  dataPath: 'data.locations',
  paths: {
    id: {
      type: PATH_TYPES.PATH,
      value: 'id',
    },
    organization: {
      type: PATH_TYPES.CONSTANT,
      value: 'citymesh',
    },
    latitude: {
      type: PATH_TYPES.PATH,
      value: 'position.coordinates[1]',
    },
    longitude: {
      type: PATH_TYPES.PATH,
      value: 'position.coordinates[0]',
    },
    application: {
      type: PATH_TYPES.PATH,
      value: 'name',
    },
  },
});
// curl 'https://footfall-api.wifilab.be/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: https://footfall-api.wifilab.be' -H 'Authorization: eyJhbGciOiJIUzI1NiJ9.Z2VudA.MCB1pnqeYgOlixDNRUERJG3F656eyJTsYG8ORo6yl3g' -H 'Client: gent' --data-binary '{"query":"query {\n  locations {\n    id\n    name\n    position {\n      coordinates\n      type\n    }\n  }\n}\n"}' --compressed

export default [api1, api2, citymeshApi];
