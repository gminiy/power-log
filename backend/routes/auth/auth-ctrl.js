const createError = require('http-errors');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  const { kakaoId, refreshToken, refreshTokenExpiresAt } = req.body;

  if (!kakaoId || !refreshToken || !refreshTokenExpiresAt) {
    next(createError(400, 'kakaoId, refreshToken, refreshTokenExpiresAt required'));
  }

  try {
    const user = await User.findOrCreate({
      where: { kakaoId },
      defaults: {
        refreshToken,
        refreshTokenExpiresAt
      }
    });

    const token = generateToken({
      kakaoId: user.kakaoId,
      refreshTokenExpiresAt: user.refreshTokenExpiresAt
    });

    return res.json({ token })
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
};