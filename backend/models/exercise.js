'use strict';
module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    paranoid: true,
  });
  Exercise.associate = function(models) {
    Exercise.belongsTo(models.User, {
      foreignKey: 'userId',
      target: 'id',
      as: 'user',
    });
    Exercise.hasMany(models.Record, {
      foreignKey: 'exerciseId',
      source: 'id',
      as: 'records',
    });
  };
  return Exercise;
};