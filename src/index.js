import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import path from 'path';
import { flatten } from 'lodash/fp';
import testApis from './test/test_apis';

const appDir = path.dirname(require.main.filename);

const app = new Koa();
const router = new Router();

app.use(serve(`${appDir}/public`));

router.get('/api', async (ctx) => {
  const data = await Promise.all(testApis.map((api) => api.invoke()));
  ctx.body = flatten(data);
});

router.all('*', async (ctx) => {
  ctx.redirect('/');
});

app.use(router.routes())
  .use(router.allowedMethods());

export default app;
