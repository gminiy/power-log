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
    Exercise.addHook('afterDestroy', async exercise => {
      try {
        const records = await exercise.getRecords();
        return records.map(async record => await record.destroy());
      } catch (e) {
        throw e;
      }
    });
  };
  return Exercise;
};