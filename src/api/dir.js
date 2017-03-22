import fetch from 'isomorphic-fetch';

export default (options) => {
  const { commit, url, mutation } = options;
  const mut = mutation.toUpperCase();

  commit(`${mut}_LOADING`);

  fetch(url)
    .then((res) => {
      if (res.status >= 400) {
        throw commit(`${mut}_ERROR`);
      }

      return res.json();
    })
    .then(json => commit(`${mut}_OK`, { json }))
    .catch(() => commit(`${mut}_ERROR`));
};
