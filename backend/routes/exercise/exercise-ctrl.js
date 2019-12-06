const createError = require('http-errors');
const { User, Exercise } = require('../../models');

exports.register = async (req, res, next) => {
  const { name } = req.body;
  if (!name) return next(createError(400, 'name is required'));
  const exerciseData = { name, userId: req.user.id }
  try {
    let exercise = await Exercise.findOne({ where: exerciseData });
    if (exercise) return next(createError(409, 'Exist exercise'));
    exercise = await Exercise.create(exerciseData);

    return res.json(exercise);
  } catch (e) {
    return next(e);
  }
};

exports.list = (req, res, next) => {
  return res.send('list');
};

exports.read = (req, res, next) => {
  return res.send('read');
};

exports.remove = (req, res, next) => {
  return res.send('remove');
};

exports.update = (req, res, next) => {
  return res.send('update');
};