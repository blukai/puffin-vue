import Vue from 'vue';

import store from 'store';
import router from 'routes';

import App from 'components/App';
import Loading from 'components/States/loading';
import Error from 'components/States/error';

Vue.component('Loading', Loading);
Vue.component('Error', Error);

/* eslint-disable no-new */
window.App = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
