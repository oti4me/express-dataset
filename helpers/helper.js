/**
 * Sorts arrays by object keys of array items
 *
 * @param {Array<object>} actors
 * @param {string} key
 * @returns
 */
const sortByKey = (actors, key) => {
  return actors.sort((a, b) => b[key] - a[key]);
};

/**
 * Remove unwanted keys from an object
 *
 * @param {any} object
 * @param {any} keys
 */
const removeKeys = (object, keys) => {
  if (Array.isArray(keys)) {
    keys.forEach((key) => delete object[key]);
  }
  delete object[keys];
};

/**
 * Remove keys from an array of objects
 *
 * @param {any} objs
 * @param {any} keys
 */
const removeKeysMulti = (objs, keys) => {
  objs.forEach((obj) => removeKeys(obj, keys));
};

module.exports = {
  sortByKey,
  removeKeys,
  removeKeysMulti,
};
