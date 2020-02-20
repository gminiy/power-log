'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const EXERCISES = ['플랫 벤치프레스', '인클라인 벤치프레스', '덤벨 프레스', '스쿼트', '레그 익스텐션', '스모 데드리프트', '이두 컬', '해머 컬', '바벨 로우', '시티드 로우', '덤벨 로우'];
    const USER_ID = '1273760967'

    const data = [];
    EXERCISES.forEach(exercise => {
      data.push({
        name: exercise,
        userId: USER_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      });  
    });
    
    return queryInterface.bulkInsert('Exercises', data);
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
