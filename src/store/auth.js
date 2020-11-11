import store from './store';
import faker from 'faker';

/**
 * @typedef {object} User
 * @property {string} username
 * @property {string} password
 * @property {string} token
 */

store.registerModule('auth', {
  namespaced: true,

  state: {
    /** @type {User} user */
    user: null,
  },
  getters: {
    isAuthenticated({ user }) {
      let credentials = localStorage.getItem('credentials');
      credentials = credentials ? JSON.parse(credentials) : null;
      return !!user || credentials;
    },
  },
  actions: {
    /**
     * @param ctx
     * @param {User} user
     */
    login(ctx, user) {
      const token = faker.finance.litecoinAddress()
        + faker.finance.litecoinAddress()
        + faker.finance.litecoinAddress();

      const generatedCredentials = { username: user.username, token };

      localStorage.setItem('credentials', JSON.stringify(generatedCredentials));
      ctx.commit('setUser', generatedCredentials);

      return generatedCredentials;
    },

    logout(ctx) {
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
