const {
  OK,
  CONFLICT,
  CREATED,
  UNPROCESSABLE_ENTITY,
  NOT_FOUND,
  BAD_REQUEST,
} = require('http-status-codes');

const conflict = (res, message) => {
  res.status(CONFLICT).json({
    status: CONFLICT,
    message,
  });
};

const created = (res, data) => {
  res.status(CREATED).json({
    status: CREATED,
    data,
  });
};

const unporecessed = (res, message) => {
  res.status(UNPROCESSABLE_ENTITY).json({
    status: UNPROCESSABLE_ENTITY,
    message,
  });
};

const ok = (res, body) => {
  res.status(OK).json({
    status: OK,
    body,
  });
};

const notFound = (res, message) => {
  res.status(NOT_FOUND).json({
    status: NOT_FOUND,
    message,
  });
};

const badRequest = (res, message) => {
  res.status(BAD_REQUEST).json({
    status: BAD_REQUEST,
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
