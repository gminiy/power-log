'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const KAKAO_ID = '1273760967';
    const users = [{
      kakaoId: KAKAO_ID,
      createdAt: new Date(),
      updatedAt: new Date()
    }];
    console.log(Sequelize.Model);

    return queryInterface.bulkInsert('Users', users);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
