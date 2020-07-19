const db = require('../db/db');
const { conflict, created, ok } = require('../helpers/response');

/**
 * Gets all events sorted by id
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 *
 * @returns {Promise<Response>}
 */
const getAllEvents = async (req, res, next) => {
  try {
    const events = await db.find({}).sort({ id: 1 }).exec();
    return ok(res, events);
  } catch (error) {
    return next(error);
  }
};

/**
 * Create events for an actor
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 *
 * @returns {Promise<Response>}
 */
const addEvent = async (req, res, next) => {
  try {
    const { body } = req;
    const event = await db.findOne({ id: body.id });

    if (event) {
      return conflict(res, 'Event already exist!!');
    }

    const newDoc = await db.insert(body);
    return created(res, newDoc);
  } catch (error) {
    return next(error);
  }
};

/**
 * Gets events by actors
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 *
 * @returns {Promise<Response>}
 */
const getByActor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const events = await db
      .find({ 'actor.id': parseInt(id) })
      .sort({ id: 1 })
      .exec();
    return ok(res, events);
  } catch (error) {
    return next(error);
  }
};

/**
 * Erase events
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 *
 * @returns {Promise<Response>}
 */
const eraseEvents = async (req, res, next) => {
  try {
    const erasedCount = await db.remove({}, { multi: true });
    return ok(res, { message: `${erasedCount} event(s) erased!!!` });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllEvents: getAllEvents,
  addEvent: addEvent,
  getByActor: getByActor,
  eraseEvents: eraseEvents,
};
