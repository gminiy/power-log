const createError = require('http-errors');
const { Set } = require('../../models');

exports.register = async (req, res, next) => {
  const { weight, reps, recordId } = req.body;
  if (!weight || !reps || !recordId) return next(createError(400, 'weight and reps are required'));
  try {
    const set = await Set.create({ weight, reps, recordId });

    return res.json(set);
  } catch (e) {
    return next(e);
  }
};

exports.remove = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(createError(400, 'id is required'));
  try {
    const result = await Set.remove({ where: { id }});

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