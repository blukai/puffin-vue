import { mdMetadata } from 'utility';

function trim(str) {
  return str.replace(/^\s+|\s+$/g, '');
}

function nonEmpty(str) {
  return str != null && str.length > 0;
}

function splitKeyValue(row) {
  const tokens = row.split(':').map(trim);

  if (tokens.length > 2) {
    throw new Error(`Malformed row: ${row}`);
  }

  return tokens;
}

function merge(acc, item) {
  /* eslint-disable no-param-reassign */
  // Normalise key to lower case, to guarantee spelling
  acc[item[0].toLowerCase()] = item[1];

  return acc;
}

export default (payload) => {
  if (mdMetadata.test(payload)) {
    const text = payload.replace(mdMetadata, '');

    return mdMetadata
      .exec(payload)[1]
      .split('\n')
      .filter(nonEmpty)
      .map(splitKeyValue)
      .reduce(merge, text.length > 1 ? { text } : {});
  }

  return payload;
};
