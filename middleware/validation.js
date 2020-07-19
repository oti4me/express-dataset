const moment = require('moment');
const { unporecessed } = require('../helpers/response');

/**
 * Validates request body for add event post request
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 *
 * @returns {next|Request}
 */
const addEventValidation = (req, res, next) => {
  const { type, actor, repo, id, created_at } = req.body;

  // TODO proper validation for the user input
  if (!id || !type || !actor || !repo || !created_at) {
    return unporecessed(res, 'Please, provide all required data');
  }

  req.body = {
    id,
    type,
    actor,
    repo,
    created_at,
  };
  return next();
};

module.exports = {
  addEventValidation,
};
