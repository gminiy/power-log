const createError = require('http-errors');
const { User, Exercise } = require('../../models');

exports.list = (req, res, next) => {
  return res.send('list');
};

exports.read = (req, res, next) => {
  return res.send('read');
};

exports.register = (req, res, next) => {
  return res.send('register');
};

exports.remove = (req, res, next) => {
  return res.send('remove');
};

exports.update = (req, res, next) => {
  return res.send('update');
};