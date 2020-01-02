const createError = require('http-errors');
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
//require('dotenv').config();

exports.register = async (req, res, next) => {
  // validation
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
    // 해당 id 유저가 있는지 확인, 있으면 conflict error
    const exist = await User.findOne({ where: { id }});
    if (exist) return next(createError(409, 'id conflict'));
    
    //password 암호화해서 저장
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ id, hashedPassword });

    // 자동 로그인, 토큰 발급. 30일 유효.
    const token = generateToken({ id: user.id });

    return res.json({ token })
  } catch (e) {
    return next(e);
  }
};

exports.login = async (req, res, next) => {
  const { id, password } = req.body;
  if (!id || !password) return next(createError(400, 'ID, Password are required'));
  try {
    // 입력 id 유저 찾기
    const user = await User.findOne({ where: { id } });
    if (!user) return next(createError(401, 'ID is wrong'));
    
    // password, id 비교
    const valid = await bcrypt.compare(password, user.hashedPassword);
    if (!valid) return next(createError(401, 'Password is wrong'));

    // 로그인 성공, 토큰 발급, 30일 유효
    const token = generateToken({ id: user.id });
  
    return res.json({ token });
  } catch (e) {
    return next(e);
  }
};

exports.check = async (req, res, next) => {
  if (!req.user) return res.status(401).send();

  return res.json({ id: req.user.id });
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
