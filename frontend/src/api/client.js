import axios from 'axios';
import { AsyncStorage } from 'react-native';

const client = axios.create({
  baseURL: 'http://7fb28a8b.ngrok.io'
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