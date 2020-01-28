const base = 'http://87592ef0.ngrok.io';

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
  getLatestDay: '/day',
};

for (const url of Object.keys(urls) ) {
  urls[url] = base + urls[url];
}

module.exports = urls;