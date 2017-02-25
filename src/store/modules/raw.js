import Vue from 'vue';

import { getRaw as raw } from 'api';
import { objectize } from 'utility';

const initialState = {
  raw: {}
};

const actions = {
  getRaw({ commit }, url) {
    return raw(commit, url);
  }
};

const mutations = {
  RAW_LOADING(state, { url }) {
    Vue.set(state.raw, url, {
      loading: true,
      error: false,
      data: ''
    });
  },

  RAW_ERROR(state, { url }) {
    Vue.set(state.raw, url, {
      loading: false,
      error: true,
      data: ''
    });
  },

  RAW_OK(state, { url, text }) {
    Vue.set(state.raw, url, {
      loading: false,
      error: false,
      metadata: objectize(text)
    });
  }
};

const getters = {
  raw(state) {
    return state.raw;
  }
};

export default {
  state: initialState,
  actions,
  mutations,
  getters
};
