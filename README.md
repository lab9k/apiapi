# apiapi

> This is some sort of an api manager, which dynamically combines data from different api's. now the api expects to 
> return data in a set structure, the goal of this project is to structure the returned data dynamically 
> (more "configurable") as well.
>

## Dependencies

* [Redis](https://redis.io/topics/quickstart)
* [MongoDB](https://docs.mongodb.com/guides/server/install/)

## Build Setup

``` bash
# install dependencies
$ npm run install

# start Redis
$ redis-server

# start MongoDB
$ service mongod start

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
