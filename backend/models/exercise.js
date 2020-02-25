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
    charset: 'utf8',
    collate: 'utf8_general_ci',
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
        const days = await exercise.getDays();
        
        return days.map(async day => await day.destroy());
      } catch (e) {
        throw e;
      }
    });
  };
  
  return Exercise;
};