const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw createError(401, 'authorization token required');

    const token = authorization.split(' ')[1];

    const { _id } = jwt.verify(token, process.env.JWT_SEC);

    req.user = await User.findOne({ _id }).select('_id');
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = requireAuth;
