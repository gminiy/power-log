const createError = require('http-errors');
const { Day, Set, Sequelize: { Op } } = require('../../models');

exports.read = async (req, res, next) => {
  const { date, exerciseId } = req.query;
  
  if(!date || !exerciseId) return next(createError(400, 'date, exerciseId is required in query'));

  try {
    const data = await Day.findAll({
      where: { date },
      attributes: ['id'],
      include: [
        {
          model: Set,
          as: 'sets',
          attributes: ['id', 'weight', 'reps']
        }
      ],
    });

    return res.json(data);
  } catch (e) {
    return next(e);
  }
};

exports.register = async (req, res, next) => {
  const { weight, reps, exerciseId, dayId } = req.body;

  if (!weight || !reps || !exerciseId || !dayId) return next(createError(400, 'weight, reps, exerciseId, dayId are required'));
  
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

exports.registerWithDate = async (req, res, next) => {
  const { weight, reps, exerciseId, date } = req.body;

  if (!weight || !reps || !exerciseId || !date) return next(createError(400, 'weight, reps, exerciseId, dayId are required'));
  
  try {
    const day = await Day.create({ exerciseId, date: new Date(date) });
    const set = await Set.create({ weight, reps, exerciseId, dayId: day.id });
    const sendingData = {
      dayId: set.dayId,
      set: {
        id: set.id,
        weight: set.weight,
        reps: set.reps
      }
    };

    return res.json(sendingData);
  } catch (e) {
    return next(e);
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(createError(400, 'id is required'));
  try {
    const result = await Set.destroy({ where: { id }});

    return res.json(result);
  } catch (e) {
    return next(e);
  }
};

exports.deleteDay = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(createError(400, 'id is required'));
  try {
    const day = await Day.findOne({ where: { id } });
    const sets = day.getSets();
    sets.map(async set => await set.destroy());
    const result = await day.destroy();

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

exports.list = async (req, res, next) => {
  const { page, size, exerciseId } = req.query;
  if (!page || !size || !exerciseId) {
    return next(createError(400, 'page, size, exerciseId are required'));
  }

  try {
    const data = await Day.findAll(
      {
        offset: (page - 1) * size,
        limit: parseInt(size),
        where: { exerciseId },
        attributes: ['id', 'date'],
        include: [{
          model: Set,
          as: 'sets',
          attributes: ['id', 'weight', 'reps']
        }],
        order: [['date', 'DESC']]
      },
    );

    return res.json(data);
  } catch (e) {
    return next(e);
  }
}