const {
  OK,
  CONFLICT,
  CREATED,
  UNPROCESSABLE_ENTITY,
  NOT_FOUND,
  BAD_REQUEST,
} = require('http-status-codes');

/**
 * Returns a json response with status code 409 and a message
 *
 * @param {any} res
 * @param {any} message
 */
const conflict = (res, message) => {
  res.status(CONFLICT).json({
    status: CONFLICT,
    message,
  });
};

/**
 * Returns a json response with status code 201 and a reponse body
 *
 * @param {any} res
 * @param {any} body
 */
const created = (res, body) => {
  res.status(CREATED).json({
    status_code: CREATED,
    body,
  });
};

/**
 * Returns a json response with status code 422 and a message
 *
 * @param {any} res
 * @param {any} message
 */
const unporecessed = (res, message) => {
  res.status(UNPROCESSABLE_ENTITY).json({
    status_code: UNPROCESSABLE_ENTITY,
    message,
  });
};

/**
 * Returns a json response with status code 200 and a response body
 *
 * @param {any} res
 * @param {any} body
 */
const ok = (res, body, status = false) => {
  const payload = status
    ? {
        status_code: OK,
        body,
      }
    : body;

  res.status(OK).json(payload);
};

/**
 * Returns a json response with status code 404 and a message
 *
 * @param {any} res
 * @param {any} message
 */
const notFound = (res, message) => {
  res.status(NOT_FOUND).json({
    status_code: NOT_FOUND,
    message,
  });
};

/**
 * Returns a json response with status code 400 and a message
 *
 * @param {any} res
 * @param {any} message
 */
const badRequest = (res, message) => {
  res.status(BAD_REQUEST).json({
    status_code: BAD_REQUEST,
    message,
  });
};

module.exports = {
  conflict,
  created,
  unporecessed,
  ok,
  notFound,
  badRequest,
};
