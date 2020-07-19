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

module.exports = {
  sortByKey,
};
