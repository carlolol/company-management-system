import Vue from 'vue';
import store from './store';
import faker from 'faker';

/**
 * @typedef {object} Company
 * @property {string} id
 * @property {string} name
 * @property {string} location
 * @property {string} description
 */

store.registerModule('company', {
  namespaced: true,

  state: {
    /** @type {Company[]} companies */
    companies: []
  },
  getters: {
    getCompanyById: state => id => {
      return state.companies.find(company => company.id = id);
    }
  },
  actions: {
    /**
     * @param ctx
     * @param {Company} payload
     */
    createCompany (ctx, payload) {
      payload.id = faker.random.uuid();
      ctx.commit('updateCompanies', { items: [ payload ], upsert: true });
      return payload;
    },

    /**
     * @param ctx
     * @param {Company} payload
     */
    updateCompany (ctx, payload) {
      if (!payload.id) throw new Error('Id is required');

      const companies = ctx.state.companies;
      const index = companies.findIndex(c => c.id === payload.id);

      if (!~index) throw new Error('Id does not exist');

      ctx.commit('updateCompanies', { items: [ payload ]});
      return payload;
    },

    /**
     * @param ctx
     * @param {Company} payload
     */
    deleteCompany (ctx, payload) {
      if (!payload.id) throw new Error('Id is required');

      const companies = ctx.state.companies;
      const index = companies.findIndex(c => c.id === payload.id);

      if (!~index) throw new Error('Id does not exist');

      ctx.commit('updateCompanies', { items: [ payload ], remove: true });
      return payload;
    },
  },
  mutations: {
    /**
     * @param state
     * @param {object} opts
     * @param {Company[]} opts.items
     * @param {boolean} opts.upsert
     * @param {boolean} opts.remove
     */
    updateCompanies ({ companies }, opts) {
      const { items, upsert, remove } = opts;

      items.forEach(item => {
        const index = companies.findIndex(b => b.id === item.id);

        if (~index) {
          if (remove) {
            Vue.delete(companies, index, item);
          } else {
            Vue.set(companies, index, item);
          }
          return;
        }

        if (upsert) companies.push(item);
      });
    }
  },
})
