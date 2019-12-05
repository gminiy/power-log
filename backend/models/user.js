'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING(64),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    hashedPassword: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  }, {
    timestamps: true,
    paranoid: true,
  });
  User.associate = function(models) {
    User.hasMany(models.Exercise, {
      foreignKey: 'userId',
      as: 'exercises',
    });
  };
  return User;
};