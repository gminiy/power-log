'use strict';
module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    timestamps: true,
    paranoid: true,
  });
  Exercise.associate = function(models) {
    Exercise.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return Exercise;
};