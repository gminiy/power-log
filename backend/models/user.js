'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    kakaoId: {
      type: DataTypes.STRING(16),
      primaryKey: true,
      allowNull: false,
      unique: true,
    }
  }, {
    timestamps: true,
    paranoid: true,
  });

  User.associate = function(models) {
    User.hasMany(models.Exercise, {
      foreignKey: 'userId',
      source: 'id',
      as: 'exercises',
    });
  };
  
  return User;
};