import axios from 'axios';
import { AsyncStorage } from 'react-native';

const client = axios.create({
  baseURL: 'http://edd1790b.ngrok.io'
});

client.interceptors.request.use(
  async (config) => {
    const token =await AsyncStorage.getItem('token');
    if (token) {
      config.headers.token = `${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default client;