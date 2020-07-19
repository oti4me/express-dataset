const { ok, notFound, badRequest } = require('../helpers/response');
const { sortByKey } = require('../helpers/helper');
const { getUniqueActors } = require('../repositories/actorsRepository');
const db = require('../db/db');

/**
 * Gets all actors sorted by events frequency
 *
 * @param {object} req
 * @param {object} res
 * @param {any} next
 *
 * @returns {Promise<object>}
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

/**
 * Update actor avatar for supplied actor's id
 *
 * @param {object} req
 * @param {object} res
 * @param {any} next
 *
 * @returns {Promise<object>}
 */
const updateActor = async (req, res, next) => {
  try {
    const { id, avatar_url } = req.body;

    const found = await db.findOne({ 'actor.id': id });

    if (!found) {
      return notFound(res, 'Actor not found');
    } else if (!avatar_url) {
      return badRequest(
        res,
        'No avater link provided, you can only update your avatar link!!!'
      );
    }

    const update = await db.update(
      { 'actor.id': id },
      { $set: { 'actor.avatar_url': avatar_url } },
      { returnUpdatedDocs: true, multi: true }
    );

    return ok(res, update);
  } catch (error) {
    return next(error);
  }
};

var getStreak = () => {};

module.exports = {
  updateActor: updateActor,
  getAllActors: getAllActors,
  getStreak: getStreak,
};
