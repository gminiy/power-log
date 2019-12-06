const jwt = require('jsonwebtoken');

exports.decodeJwt = (req, res, next) => {
  const token = req.get('jwt');
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      expires: decoded.exp
    }

    return next();
  } catch (e) {
    return next(e);
  }
};