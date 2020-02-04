'use strict';
module.exports = (sequelize, DataTypes) => {
  const Error = sequelize.define('Error', {
    userId: {
      type: DataTypes.STRING(16),
    },
    log: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: true,
    paranoid: true,
  });

  return Error;
};