import Vue from 'vue';
import Vuex from 'vuex';

import postList from './modules/postList';
import raw from './modules/raw';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    postList,
    raw
  }
});
