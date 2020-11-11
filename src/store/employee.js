import Vue from 'vue';
import store from './store';
import faker from 'faker';

/**
 * @typedef {object} Employee
 * @property {string} uuid
 * @property {string} companyId
 * @property {string} departmentId
 * @property {string} firstName
 * @property {string} lastName
 * @property {'male' | 'female' | 'any'} sex
 * @property {number} birthDate
 * @property {string} civilStatus
 * @property {string} jobPosition
 */

store.registerModule('employee', {
  namespaced: true,

  state: {
    /** @type {Employee[]} employees */
    employees: []
  },
  getters: {
    getEmployeeById: state => id => {
      return state.employees.find(employee => employee.id = id);
    }
  },
  actions: {
    /**
     * @param ctx
     * @param {Employee} payload
     */
    createEmployee(ctx, payload) {
      if (!payload.companyId) throw new Error('Company id is required');

      payload.uuid = faker.random.uuid();
      ctx.commit('updateEmployees', { items: [ payload ], upsert: true });
      return payload;
    },

    /**
     * @param ctx
     * @param {Employee} payload
     */
    updateEmployee(ctx, payload) {
      if (!payload.uuid) throw new Error('Id is required');

      const employees = ctx.state.employees;
      const index = employees.findIndex(c => c.id === payload.uuid);

      if (!~index) throw new Error('Id does not exist');

      ctx.commit('updateEmployees', { items: [ payload ]});
      return payload;
    },

    /**
     * @param ctx
     * @param {Employee} payload
     */
    deleteEmployee(ctx, payload) {
      if (!payload.uuid) throw new Error('Id is required');

      const employees = ctx.state.employees;
      const index = employees.findIndex(c => c.id === payload.uuid);

      if (!~index) throw new Error('Id does not exist');

      ctx.commit('updateEmployees', { items: [ payload ], remove: true });
      return payload;
    },
  },
  mutations: {
    /**
     * @param state
     * @param {object} opts
     * @param {Employee[]} opts.items
     * @param {boolean} opts.upsert
     * @param {boolean} opts.remove
     */
    updateEmployees({ employees }, opts) {
      const { items, upsert, remove } = opts;

      items.forEach(item => {
        const index = employees.findIndex(b => b.id === item.id);

        if (~index) {
          if (remove) {
            Vue.delete(employees, index, item);
          } else {
            Vue.set(employees, index, item);
          }
          return;
        }

        if (upsert) employees.push(item);
      });
    }
  },
})
