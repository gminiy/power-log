const baseUrl = 'http://192.168.1.68:3000';
const urls = {
  register: '/auth/register',
  login: '/auth/login'
};
for(url in urls) {
  urls[url] = `${baseUrl}${urls[url]}`;
}

module.exports = urls;