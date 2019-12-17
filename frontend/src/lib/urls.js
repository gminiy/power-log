const baseUrl = 'http://192.168.1.68:3000';
const urls = {
  register: '/auth/register',
  login: '/auth/login',
  checkAuth: '/auth/check',
  getExercises: '/exercise',
};
for(url in urls) {
  urls[url] = `${baseUrl}${urls[url]}`;
}

module.exports = urls;