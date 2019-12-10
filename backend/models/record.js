'use strict';
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('Record', {
    volume: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  }, {
    timestamps: true,
    paranoid: true,
  });
  Record.associate = function(models) {
    Record.belongsTo(models.Exercise, {
      foreignKey: 'exerciseId',
      target: 'id',
      as: 'exercises',
    });
    Record.hasMany(models.Set, {
      foreignKey: 'recordId',
      target: 'id',
      as: 'sets',
    });
    Record.addHook('afterDestroy', async record => {
      try {
        const sets = await record.getSets();
        console.log(sets);
        return sets.map(async set => await set.destroy());
      } catch (e) {
        throw e;
      }
    })
  };
  return Record;
};