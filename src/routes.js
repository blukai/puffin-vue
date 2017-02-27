import Vue from 'vue';
import VueRouter from 'vue-router';

import AppHome from 'components/Home';
import AppPage from 'components/Page';
import FourOhFour from 'components/FourOhFour';

Vue.use(VueRouter);

const routes = [{
  path: '/:view?',
  component: AppHome
}, {
  path: '/page/:page',
  component: AppPage
}, {
  path: '*',
  component: FourOhFour
}];

export default new VueRouter({
  // mode: 'history',
  routes
});
