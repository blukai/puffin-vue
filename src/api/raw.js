import fetch from 'isomorphic-fetch';

export default (commit, url) => {
  commit('RAW_LOADING', { url });

  fetch(url)
    .then((res) => {
      if (res.status >= 400) {
        commit('RAW_ERROR', { url });
      }

      return res.text();
    }).then(text => commit('RAW_OK', { url, text }))
    .catch(() => commit('RAW_ERROR', { url }));
};
