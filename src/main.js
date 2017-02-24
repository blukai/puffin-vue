import Vue from 'vue';
import App from 'components/App';
import router from 'routes';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
