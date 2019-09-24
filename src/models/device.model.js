export default class Device {
  constructor({
    id = '',
    organization = '',
    reference = '',
    application = '',
    longitude = 0.0,
    latitude = 0.0,
    types = [],
    categories = [],
    meta = {},
  }) {
    this.id = id;
    this.organization = organization;
    this.reference = reference;
    this.application = application;
    this.longitude = longitude;
    this.latitude = latitude;
    this.types = types;
    this.categories = categories;
    this.meta = meta;
  }
}
