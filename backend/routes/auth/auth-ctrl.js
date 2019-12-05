exports.register = async (req, res, next) => {
  res.send('register');
};

exports.login = async (req, res, next) => {
  res.send('login');
};

exports.logout = async (req, res, next) => {
  res.send('logout');
};