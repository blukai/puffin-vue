import Vue from 'vue';
import Vuex from 'vuex';

import postList from './modules/postList';
import raw from './modules/raw';
import pageList from './modules/pageList';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    postList,
    raw,
    pageList
  }
});
