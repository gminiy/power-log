'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      kakaoId: {
        type: Sequelize.STRING(16),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      refreshToken: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      refreshTokenExpiresAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};