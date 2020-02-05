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

exports.checkToken = async (req, res, next) => {
  if (!req.user) return res.status(401).send();

  const restDays = (req.user.expires * 1000 - Date.now()) / (1000 * 60 * 60 * 24);
  let isReissued = (restDays < 15) ? true : false;
  let token = (restDays < 15) ? generateToken({ kakaoId: req.user.kakaoId }) : null;

  return res.json({ isReissued, token });
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