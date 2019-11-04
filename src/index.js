import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import path from 'path';
import { flatten } from 'lodash/fp';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import testApis from './test/test_apis';
import { connectToDB } from './db/index';
import ApiController from './controllers/api.controller';

const appDir = path.dirname(require.main.filename);

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

app.use(serve(`${appDir}/public`));

app.use(async (ctx, next) => {
  await connectToDB('mongodb://127.0.0.1:27017/apiapi');
  await next();
});

router.get('/api/devices', async (ctx) => {
  const data = await Promise.all(testApis.map((api) => api.invoke()));
  ctx.body = flatten(data);
});

router.get('/api/devices/:name', async (ctx) => {
  const api = testApis.find((a) => a.name === ctx.params.name);
  if (!api) {
    ctx.body = { err: `api "${ctx.params.name}" was not found.` };
  } else {
    ctx.body = await api.raw();
  }
});

router.get('/api/invoke', async (ctx) => {
  const response = await ApiController.invokeAll();
  ctx.body = response;
});

// find all apis
router.get('/api', async (ctx) => {
  ctx.body = await ApiController.findAll();
});

// create api
router.post('/api', async (ctx) => {
  const res = await ApiController.create(ctx.request.body);
  ctx.body = res;
});

// get single api
router.get('/api/:name', async (ctx) => {
  ctx.body = await ApiController.find(ctx.params.name);
});

// update api
router.put('/api/:name', async (ctx) => {
  ctx.body = await ApiController.update(ctx.params.name, ctx.request.body);
});

// delete api
router.del('/api/:name', async (ctx) => {
  ctx.body = await ApiController.delete(ctx.params.name);
});

router.all('*', async (ctx) => {
  ctx.redirect('/');
});

app.use(router.routes()).use(router.allowedMethods());

export default app;
