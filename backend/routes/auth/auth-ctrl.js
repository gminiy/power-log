const createError = require('http-errors');
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  const schema = Joi.object().keys({
    id: Joi.string()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  });
  const result = Joi.validate(req.body, schema);
  if(result.error) return next(createError(400));
  const { id, password } = req.body;
  try {
    const exist = await User.findOne({ where: { id }});
    if (exist) return next(createError(409, 'id conflict'));
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ id, hashedPassword });

    // 자동 로그인, 토큰 발급. 30일 유효.
    const token = generateToken({ id: user.id });
    res.set({
      'jwt': token
    });
    return res.json({ id: user.id })
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

const generateToken = dataObj => {
  const token = jwt.sign(
    dataObj,
    process.env.JWT_SECRET,
    {
      expiresIn: '30d'
    }
  );
  return token;
}