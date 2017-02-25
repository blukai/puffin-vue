import fetch from 'isomorphic-fetch';

import { github } from '../../config.json';

const { user, repo } = github;
const getUrl = dir => `//api.github.com/repos/${user}/${repo}/contents/content/${dir}?ref=content`;

export const getPostList = (commit) => {
  commit('POSTLIST_LOADING');

  fetch(getUrl('posts'))
    .then((res) => {
      if (res.status >= 400) {
        throw commit('POSTLIST_ERROR');
      }

      return res.json();
    }).then(json => commit('POSTLIST_OK', { json }));
};

export const getRaw = (commit, url) => {
  commit('RAW_LOADING', { url });

  fetch(url)
    .then((res) => {
      if (res.status >= 400) {
        commit('RAW_ERROR', { url });
      }

      return res.text();
    }).then(text => commit('RAW_OK', { url, text }));
};
