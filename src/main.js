import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router';

// plugins
import vuetify from './plugins/vuetify';
import './plugins/vue-fragment';

// mixins
import './mixins';

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
