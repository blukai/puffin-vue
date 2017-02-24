import fetch from 'isomorphic-fetch';

import { github } from '../../config.json';

const { user, repo, branch } = github;
const url = dir => `//api.github.com/repos/${user}/${repo}/contents/content/${dir}?ref=${branch}`;

export const getPosts = (commit) => {
  commit('POSTS_LOADING');

  fetch(url('posts'))
    .then((res) => {
      if (res.status >= 400) {
        throw commit('POSTS_ERROR');
      }

      return res.json();
    }).then(json => commit('POSTS_OK', { json }));
};

export const getPages = (commit) => {
  commit('PAGES_LOADING');

  fetch(url('pages'))
    .then((res) => {
      if (res.status >= 400) {
        throw commit('PAGES_ERROR');
      }

      return res.json();
    }).then(json => commit('PAGES_OK', { json }));
};
