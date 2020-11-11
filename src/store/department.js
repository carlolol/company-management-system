import store from './store';
import faker from 'faker';

/**
 * @typedef {object} Department
 * @property {string} id
 * @property {string} companyId
 * @property {string} name
 * @property {string} description
 */

store.registerModule('department', {
  namespaced: true,

  state: {
    /** @type {Department[]} departments */
    departments: []
  },
  getters: {
    getDepartmentById: state => id => {
      return state.departments.find(department => department.id = id);
    }
  },
  actions: {
    /**
     * @param ctx
     * @param {Department} payload
     */
    createDepartment(ctx, payload) {
      if (!payload.companyId) throw new Error('Company id is required');

      payload.id = faker.random.uuid();
      ctx.commit('updateDepartments', { items: [ payload ], upsert: true });
      return payload;
    },

    /**
     * @param ctx
     * @param {Department} payload
     */
    updateDepartment(ctx, payload) {
      if (!payload.id) throw new Error('Id is required');

      const departments = ctx.state.departments;
      const index = departments.findIndex(c => c.id === payload.id);

      if (!~index) throw new Error('Id does not exist');

      ctx.commit('updateDepartments', { items: [ payload ]});
      return payload;
    },

    /**
     * @param ctx
     * @param {Department} payload
     */
    deleteDepartment(ctx, payload) {
      if (!payload.id) throw new Error('Id is required');

      const departments = ctx.state.departments;
      const index = departments.findIndex(c => c.id === payload.id);

      if (!~index) throw new Error('Id does not exist');

      ctx.commit('updateDepartments', { items: [ payload ], remove: true });
      return payload;
    },
  },
  mutations: {
    /**
     * @param state
     * @param {object} opts
     * @param {Department[]} opts.items
     * @param {boolean} opts.upsert
     * @param {boolean} opts.remove
     */
    updateDepartments({ departments }, opts) {
      const { items, upsert, remove } = opts;

      items.forEach(item => {
        const index = departments.findIndex(b => b.id === item.id);

        if (~index) {
          if (remove) {
            Vue.delete(departments, index, item);
          } else {
            Vue.set(departments, index, item);
          }
          return;
        }

        if (upsert) departments.push(item);
      });
    }
  },
})
