import store from '../store';
import router from './routes';

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/isAuthenticated']) {
      next();
    } else {
      next({ path: '/login' });
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters['auth/isAuthenticated']) {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    next();
  }
});
