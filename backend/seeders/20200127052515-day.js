'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { Exercise } = require('../models');
    const exercises = await Exercise.findAll({
      attributes: ['id'],
    });
    const DAY = 1000*60*60*24;
    const today = new Date();
    const data = [];
    
    for (let i = 0; i < 600; i = i + 3) {
      const before = today - i*DAY;
      const day = new Date(before);
      const year = day.getFullYear().toString();
      const month = (day.getMonth()+1).toString();
      const date = day.getDate().toString();
      exercises.forEach(({ id }) => {
        data.push({
          exerciseId: id,
          date: `${year}-${month}-${date}`,
          createdAt: today,
          updatedAt: today
          });
      });
    }

    return queryInterface.bulkInsert('days', data); 
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
