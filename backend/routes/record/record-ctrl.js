const createError = require('http-errors');
const { Record, Set } = require('../../models');

exports.register = async (req, res, next) => {
  const { volume, exerciseId } = req.body;
  if (!volume || !exerciseId) return next(createError(400, 'volume and exerciseId are required'));
  try {
    const record = await Record.create({ volume, exerciseId });

    return res.json(record);
  } catch (e) {
    return next(e);
  }
};

exports.read = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(createError(400, 'id is required'));
  try {
    const record = await Record.findOne({
      where: { id },
      include: [
        {
          model: Set,
          as: 'sets',
          attributes: ['id', 'weight', 'reps'],
        },
      ],
    });

    return res.json(record);
  } catch (e) {
    return next(e);
  }
};

exports.remove = async (req, res, next) => {
  return res.send('remove');
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { volume } = req.body;
  if (!id || !volume) return next(createError(400, 'id and volume are required'));
  try {
    const result = await Record.update({ volume }, { where: { id }});
    if (!result[0]) return next(createError(404));

    return res.send();
  } catch (e) {
    return next(e);
  }
};