import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/api',
      name: 'api',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "api-list" */ '../views/ApiList.vue'),
    },
    {
      path: '/api/:name',
      name: 'api-detail',
      component: () => import(/* webpackChunkName: "api-detail" */ '../views/ApiDetail.vue'),
    },
    {
      path: '/create',
      name: 'create',
      component: () => import(/* webpackChunkName: "api-create" */ '../views/ApiCreate.vue'),
    },
  ],
});
