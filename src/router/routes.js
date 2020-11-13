import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login';
import NotFound from '@/views/NotFound';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard'),
    meta: {
      requiresAuth: true,
      name: 'Dashboard',
    },
  },
  {
    path: '/company',
    name: 'company',
    component: () => import(/* webpackChunkName: "company" */ '@/views/Company'),
    meta: {
      requiresAuth: true,
      name: 'Company',
    },
  },
  {
    path: '/department',
    name: 'department',
    component: () => import(/* webpackChunkName: "department" */ '@/views/Department'),
    meta: {
      requiresAuth: true,
      name: 'Department',
    },
  },
  {
    path: '/employee',
    name: 'employee',
    component: () => import(/* webpackChunkName: "employee" */ '@/views/Employee'),
    meta: {
      requiresAuth: true,
      name: 'Employee',
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
    component: NotFound,
  },
  {
    path: '*',
    redirect: 'not-found',
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
