const { ok, notFound, badRequest } = require('../helpers/response');
const { sortByKey, removeKeysMulti } = require('../helpers/helper');
const {
  getUniqueActors,
  getActorStreak,
} = require('../repositories/actorsRepository');
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
    const events = await db
      .find({})
      .sort({
        created_at: -1,
        'actor.login': 1,
      })
      .exec();

    const uniqueActors = await getUniqueActors(events);
    const actors = sortByKey(uniqueActors, 'count');
    removeKeysMulti(actors, 'count');
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

/**
 * Gets actors by streak
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 *
 * @returns {Promise<object>}
 */
const getStreak = async (req, res, next) => {
  try {
    const streak = await getActorStreak();
    const actors = sortByKey(streak, 'streak');
    removeKeysMulti(actors, ['count', 'streak']);
    return ok(res, streak, true);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  updateActor: updateActor,
  getAllActors: getAllActors,
  getStreak: getStreak,
};
