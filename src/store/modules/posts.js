import Vue from 'vue';

import { getPostList as posts } from 'api';
import { md } from 'utility';

const initialState = {
  posts: {
    loading: false,
    error: false,
    data: {}
  }
};

const actions = {
  getPosts({ commit }) {
    return posts(commit);
  }
};

const mutations = {
  POSTLIST_LOADING(state) {
    Vue.set(state, 'posts', {
      loading: true,
      error: false,
      data: {}
    });
  },
  POSTLIST_ERROR(state) {
    Vue.set(state, 'posts', {
      loading: false,
      error: true,
      data: {}
    });
  },
  POSTLIST_OK(state, { json }) {
    Vue.set(state, 'posts', {
      loading: false,
      error: false,
      data: json
    });
  }
};

const getters = {
  posts(state) {
    const p = state.posts;

    if (!p.loading && !p.error && p.data.length > 0) {
      return p.data.filter(item => md.test(item.name)).map(item => ({
        title: item.name.replace(md, ''),
        url: item.download_url
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
