const { ok } = require('../helpers/response');
const { sortByKey } = require('../helpers/helper');
const { getUniqueActors } = require('../repositories/actorsRepository');

/**
 * Gets all actors sorted by events frequency
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 *
 * @returns {Response}
 */
const getAllActors = async (req, res, next) => {
  try {
    const uniqueActors = await getUniqueActors();
    const actors = sortByKey(uniqueActors, 'count');
    return ok(res, actors);
  } catch (error) {
    return next(error);
  }
};

var updateActor = () => {};

var getStreak = () => {};

module.exports = {
  updateActor: updateActor,
  getAllActors: getAllActors,
  getStreak: getStreak,
};
