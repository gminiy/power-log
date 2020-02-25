'use strict';
module.exports = (sequelize, DataTypes) => {
  const Set = sequelize.define('Set', {
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    reps: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    volume: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    }
  }, {
    timestamps: true,
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });

  Set.associate = function(models) {
    Set.belongsTo(models.Day, {
      foreignKey: 'dayId',
      target: 'id',
      as: 'day',
    });
  };
  
  return Set;
};