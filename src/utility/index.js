import { github } from '../../config.json';

export { default as objectize } from './objectize';

export const md = /\.md$/i;

export const mdMetadata = /-{3}([\s\S]*)-{3}/;

export const clean = srt => srt
  .replace(/(^-+|[^a-zA-Z0-9/_| -]+|-+$)/g, '')
  .toLowerCase()
  .replace(/[/_| -]+/g, '-');

export const getImgUrl = img => `//raw.githubusercontent.com/${github.user}/${github.repo}/content/content/images/${img}`;
