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

    Exercise.hasMany(models.Day, {
      foreignKey: 'exerciseId',
      source: 'id',
      as: 'days'
    });

    Exercise.addHook('afterDestroy', async exercise => {
      try {
        const sets = await exercise.getSets();
        return sets.map(async set => await set.destroy());
      } catch (e) {
        throw e;
      }
    });
  };
  
  return Exercise;
};