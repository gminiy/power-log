'use strict';
module.exports = (sequelize, DataTypes) => {
  const Day = sequelize.define('Day', {
    date: DataTypes.STRING
  }, {
    timestamps: true,
    paranoid: true,
  });

  Day.associate = function(models) {
    Day.belongsTo(models.Exercise, {
      foreignKey: 'exerciseId',
      target: 'id',
      as: 'exercise',
    });

    Day.hasMany(models.Set, {
      foreignKey: 'dayId',
      source: 'id',
      as: 'sets',
    });
  };

  return Day;
};