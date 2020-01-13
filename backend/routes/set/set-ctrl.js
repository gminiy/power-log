const createError = require('http-errors');
const { Set, Sequelize: { Op } } = require('../../models');

exports.list = async (req, res, next) => {
  if (!req.query.id || !req.query.date) {
    return next(createError(400, 'exerciseId, date are required'));
  }

  const exerciseId = req.query.id;
  const date = new Date(req.query.date);
  let tomorrow = new Date(req.query.date);
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    const set = await Set.findAll({
      where: {
        exerciseId,
        createdAt: {
          [Op.gte]: date,
          [Op.lte]: tomorrow
        }
      },
      attributes: ['id', 'weight', 'reps']
    });

    return res.json(set);
  } catch (e) {
    return next(e);
  }
}

exports.register = async (req, res, next) => {
  const { weight, reps, exerciseId, dayId } = req.body;
  if (!weight || !reps || !exerciseId) return next(createError(400, 'weight, reps, recordId are required'));
  try {
    const set = await Set.create({ weight, reps, exerciseId, dayId });
    const sendingData = {
      id: set.id,
      weight: set.weight,
      reps: set.reps
    };

    return res.json(sendingData);
  } catch (e) {
    return next(e);
  }
};

exports.remove = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(createError(400, 'id is required'));
  try {
    const result = await Set.destroy({ where: { id }});

    return res.json(result);
  } catch (e) {
    return next(e);
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { weight, reps } = req.body;
  if (!weight || !reps) return next(createError(400, 'weight and reps are required'));
  try {
    const result = await Set.update({ weight, reps }, { where: { id }});
    if (!result[0]) return next(createError(404));

    return res.send();
  } catch (e) {
    return next(e);
  }
};