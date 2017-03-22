import Vue from 'vue';
import { dir } from 'api';
import { md, clean, getUrl } from 'utility';

const initialState = {
  posts: {
    loading: false,
    error: false,
    data: {}
  }
};

const actions = {
  getPosts({ commit }) {
    return dir({
      commit,
      url: getUrl('posts'),
      mutation: 'POSTS'
    });
  }
};

const mutations = {
  POSTS_LOADING(state) {
    Vue.set(state, 'posts', {
      loading: true,
      error: false,
      data: {}
    });
  },
  POSTS_ERROR(state) {
    Vue.set(state, 'posts', {
      loading: false,
      error: true,
      data: {}
    });
  },
  POSTS_OK(state, { json }) {
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
