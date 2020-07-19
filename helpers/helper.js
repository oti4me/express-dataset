const sortByKey = (actors, key) => {
  return actors.sort((a, b) => b[key] - a[key]);
};

module.exports = {
  sortByKey,
};
