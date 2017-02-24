import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import store from 'store';
import router from 'routes';

import App from 'components/App';

sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
