const createError = require('http-errors');
const { Exercise, Record } = require('../../models');

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

exports.list = async (req, res, next) => {
  if (!req.user.id) return next(createError(401));
  try {
    const exercises = await Exercise.findAll({ 
      where: { userId: req.user.id },
      attributes: ['id', 'name'],
    });

    return res.json(exercises);
  } catch (e) {
    return next(e);
  }
};

exports.read = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(createError(400, 'id is required'));
  try {
    const exercise = await Exercise.findOne({
      where: { id },
      include: [
        {
          model: Record,
          as: 'records',
          attributes: ['id', 'volume'],
        },
      ],
    });
    return res.json(exercise);
  } catch (e) {
    return next(e);
  }
};

exports.remove = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(createError(400, 'id is required'));
  try {
    const result = await Exercise.destroy({ 
      where: { id },
      individualHooks: true,
    });
    if (!result) return next(createError(400, 'no exercise'));

    return res.json(result);
  } catch (e) {
    return next(e);
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!id || !name) return next(createError(400, 'id and name are required'));
  try {
    const result = await Exercise.update({ name }, { where: { id }});
    if (!result[0]) return next(createError(404));

    return res.send();
  } catch (e) {
    return next(e);
  }
};