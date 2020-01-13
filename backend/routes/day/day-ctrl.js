const createError = require('http-errors');
const { Day } = require('../../models');

exports.register = async (req, res, next) => {
  res.send("register");
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