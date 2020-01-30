const createError = require('http-errors');
const { Day } = require('../../models');

exports.getLatest = async (req, res, next) => {
  const { exerciseId } = req.query;
  if(!exerciseId) return next(createError(400, 'exerciseId is required in query'));

  try {
    const data = await Day.findOne(
      {
        where: { exerciseId },
        attributes: ['date'],
        order: [['date', 'DESC']],
      },
    );
    
    if (!data) {
      return res.status(204).send();
    }
    
    return res.json(data);
  } catch (e) {
    return next(e);
  }
};

exports.delete = async (req, res, next) => {
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