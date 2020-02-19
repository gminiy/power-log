const base = 'http://13.124.85.234';

const urls = {
  register: '/auth/register',
  login: '/auth/login',
  checkToken: '/auth/check',
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
  getLatestDay: '/day/latest',
  getSetListWithPeriod: '/set/list/period',
  getSetListAll: '/set/list/all',
  deleteDay: '/day',
  getLatestDay: '/day/latest',
};

for (const url of Object.keys(urls) ) {
  urls[url] = base + urls[url];
}

module.exports = urls;