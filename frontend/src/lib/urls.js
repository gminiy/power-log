const baseUrl = 'http://e9df29ad.ngrok.io';
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