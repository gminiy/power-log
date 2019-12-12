import { Alert } from 'react-native';

module.exports = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (response.status === 500) return Alert.alert('서버에 장애가 발생했습니다. 다시 시도해주세요.');
    return response;
  } catch(e) {
    console.log(e);
    return Alert.alert('장애가 발생했습니다. 다시 시도해주세요.');
  }
};