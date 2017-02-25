export const md = /\.md$/i;

export const clean = srt => srt
  .replace(/(^-+|[^a-zA-Z0-9/_| -]+|-+$)/g, '')
  .toLowerCase()
  .replace(/[/_| -]+/g, '-');
