import Vue from 'vue';
import Vuex from 'vuex';

import posts from './modules/posts';
import raw from './modules/raw';
import pages from './modules/pages';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    posts,
    raw,
    pages
  }
});
