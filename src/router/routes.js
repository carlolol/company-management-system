import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresGuest: true
    },
  },
  {
    path: '/not-found',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "not-found" */ '@/views/NotFound'),
  },
  {
    path: '*',
    redirect: 'not-found',
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
