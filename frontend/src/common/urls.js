const base = 'http://54a262e6.ngrok.io';

const urls = {
  register: '/auth/register',
  login: '/auth/login',
  checkAuth: '/auth/check',
  getExercises: '/exercise',
  addExercise: '/exercise',
  updateExercise: '/exercise',
  deleteExercise: '/exercise',
  getSets: '/set',
  addSet: '/set',
  addSetWithDate: '/set/withDate',
  updateSet: '/set',
  deleteSet: '/set',
  getSetList: '/set/list',
  getSetListWithPeriod: '/set/list/period',
  deleteDay: '/set/day',
};

for (const url of Object.keys(urls) ) {
  urls[url] = base + urls[url];
}

module.exports = urls;