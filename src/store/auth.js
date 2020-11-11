import store from './store';

/**
 * @typedef {object} User
 * @property {string} firstName
 * @property {string} lastName
 */

store.registerModule('auth', {
  namespaced: true,

  state: {
    /** @type {User} user */
    user: null,
  },
  getters: {
    isLoggedIn({ user }) {
      return !!user;
    },
  },
  actions: {
    /**
     * @param ctx
     * @param {User} user
     */
    login(ctx, user) {
      const credentials = localStorage.getItem('credentials');

      if (credentials) {
        ctx.commit('setUser', credentials);
      } else {
        localStorage.setItem('credentials', JSON.stringify(user));
        ctx.commit('setUser', user);
      }

      return user;
    },

    logout() {
      ctx.commit('setUser');
      localStorage.clear();
    },
  },
  mutations: {
    /**
     * @param state
     * @param {User} user
     */
    setUser(state, user) {
      state.user = user || null;
    },
  },
})
