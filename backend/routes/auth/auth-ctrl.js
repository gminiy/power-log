const createError = require('http-errors');
const { User } = require('../../models');
const bcrypt = require('bcrypt');

exports.register = async (req, res, next) => {
  const { id, password } = req.body;
  if (!(id && password)) return next(createError(400, 'id and password are required'));
  try {
    const exist = await User.findOne({ where: { id }});
    if (exist) return next(createError(409), 'There is user with the id');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ id, hashedPassword });
    return res.json(user);
  } catch (e) {
    return next(e);
  }
};

exports.login = async (req, res, next) => {
  res.send('login');
};

exports.logout = async (req, res, next) => {
  res.send('logout');
};