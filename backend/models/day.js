'use strict';
module.exports = (sequelize, DataTypes) => {
  const Day = sequelize.define('Day', {
    date: DataTypes.DATEONLY
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

  Day.addHook('afterDestroy', async day => {
    try {
      const sets = await day.getSets();
      
      return sets.map(async set => await set.destroy());
    } catch (e) {
      throw e;
    }
  });

  return Day;
};