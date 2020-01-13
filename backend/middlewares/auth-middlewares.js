const createError = require('http-errors');

exports.isLoggedIn = (req, res, next) => {
  if (req.user) return next();
  next(createError(401));
}