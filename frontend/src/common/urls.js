const base = 'http://dd149d7d.ngrok.io';

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
  deleteDay: '/day',
  getLatestDay: '/day/latest',
};

for (const url of Object.keys(urls) ) {
  urls[url] = base + urls[url];
}

module.exports = urls;