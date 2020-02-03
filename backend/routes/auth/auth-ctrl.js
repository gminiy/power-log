const createError = require('http-errors');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  const { kakaoId } = req.body;

  if (!kakaoId) {
    next(createError(400, 'kakaoId is required'));
  }

  try {
    const [user] = await User.findOrCreate({
      where: { kakaoId },
    });
    
    const token = generateToken({
      kakaoId: user.kakaoId,
    });

    return res.json({ token })
  } catch (e) {
    return next(e);
  }
};

exports.check = async (req, res, next) => {
  if (!req.user) return res.status(401).send();

  return res.json({ kakaoId: req.user.kakaoId });
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
};