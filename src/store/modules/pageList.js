import Vue from 'vue';

import { getPageList as pages } from 'api';
import { md, clean } from 'utility';

const initialState = {
  pages: {
    loading: false,
    error: false,
    data: {}
  }
};

const actions = {
  getPages({ commit }) {
    return pages(commit);
  }
};

const mutations = {
  PAGELIST_LOADING(state) {
    Vue.set(state, 'pages', {
      loading: true,
      error: false,
      data: {}
    });
  },
  PAGELIST_ERROR(state) {
    Vue.set(state, 'pages', {
      loading: false,
      error: true,
      data: {}
    });
  },
  PAGELIST_OK(state, { json }) {
    Vue.set(state, 'pages', {
      loading: false,
      error: false,
      data: json
    });
  }
};

const getters = {
  pages(state) {
    const p = state.pages;

    // Transformations
    if (!p.loading && !p.error && p.data.length > 0) {
      return p.data.filter(item => md.test(item.name)).map(item => ({
        title: item.name.replace(md, ''),
        file: item.download_url,
        link: clean(item.name.replace(md, ''))
      }));
    }

    return p;
  }
};

export default {
  state: initialState,
  actions,
  mutations,
  getters
};
