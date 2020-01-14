const createError = require('http-errors');
const { Day } = require('../../models');

// todo: 매번 존재하는 date인지 확인하지 않고 미리 date가 등록된건지 아닌지 아는 방법이 없을까?
exports.register = async (req, res, next) => {
  const { exerciseId, date } = req.body;

  if (!exerciseId || !date) return next(createError(400, 'execrciseId and date are required'));

  try {
    const day = await Day.findOrCreate({
      where: { exerciseId, date },
      attributes: ["id", "date"]
    });
    
    const sendingData = {
      id: day[0].id,
      date: day[0].date,
      isNew: day[1]
    }
    
    return res.json(sendingData);
  } catch (e) {
    return next(e);
  }
};

exports.list = async (req, res, next) => {
  res.send("list");
};

exports.read = async (req, res, next) => {
  res.send('read');
};

exports.remove = async (req, res, next) => {
  res.send('remove');
};