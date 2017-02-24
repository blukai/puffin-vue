import Vue from 'vue';
import VueRouter from 'vue-router';

import AppHome from 'components/Home';
import FourOhFour from 'components/FourOhFour';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  component: AppHome
}, {
  path: '*',
  component: FourOhFour
}];

export default new VueRouter({
  mode: 'history',
  routes
});
