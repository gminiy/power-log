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
    }
  }, {
    timestamps: true,
    paranoid: true,
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