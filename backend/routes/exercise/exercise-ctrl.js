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
    
    const sendingData = {
      id: exercise.id,
      name: exercise.name,
    }

    return res.json(sendingData);
  } catch (e) {
    return next(e);
  }
};

exports.list = async (req, res, next) => {  
  const { page, size } = req.query;

  if (!page || !size ) {
    return next(createError(400, 'page, size, exerciseId are required'));
  }
  
  try {
    const { count, rows: exercises } = await Exercise.findAndCountAll({ 
      offset: (page - 1) * size,
      limit: parseInt(size),
      where: { userId: req.user.id },
      attributes: ['id', 'name'],
      order: [['id', 'DESC']]
    });

    const hasNextPage = (page * size) < count;

    return res.json({ hasNextPage, exercises });
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

  const exerciseData = { name, userId: req.user.id }

  try {
    let exercise = await Exercise.findOne({ where: exerciseData });
    if (exercise) return next(createError(409, 'Exist exercise'));

    const result = await Exercise.update({ name }, { where: { id }});
    if (!result[0]) return next(createError(404));

    return res.send();
  } catch (e) {
    return next(e);
  }
};