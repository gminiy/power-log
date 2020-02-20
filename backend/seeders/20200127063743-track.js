'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const EXERCISE_LENGTH = 11;
    const INITIAL_WEIGHT = 50;
    const REPS = 10;    
    const { Day } = require('../models');
    
    const days = await Day.findAll({
      attributes: ['id'],
    });

    const data = [];
    let weight = INITIAL_WEIGHT;

    days.forEach(({ id: dayId }) => {
      for(let i = 0; i < 3; i++) {
        data.push({
          dayId,
          weight,
          reps: REPS,
          volume: weight * REPS,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      if (!(dayId % EXERCISE_LENGTH)) weight = weight + 1;
    });
  
    return queryInterface.bulkInsert('Sets', data); 
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
