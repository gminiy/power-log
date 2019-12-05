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
  };
  return Record;
};