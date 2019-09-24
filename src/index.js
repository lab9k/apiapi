import Koa from 'koa';
import testApis from './test/test_apis';
// import Router from 'koa-router';

const app = new Koa();
app.use(async (ctx) => {
  const data = await Promise.all(testApis.map((api) => api.invoke()));
  ctx.body = data;
});

export default app;
