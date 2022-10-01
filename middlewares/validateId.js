const { isValidObjectId } = require('mongoose');
const createError = require('http-errors');

const validateId = (req, res, next, val) => {
  if (!isValidObjectId(val)) throw createError(400, 'invalid Id');
  next();
};

module.exports = validateId;
