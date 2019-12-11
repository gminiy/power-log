import { Alert } from 'react-native';

module.exports = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (response.status !== 200) return Alert.alert('장애가 발생했습니다. 다시 시도해주세요.');
    return await response.json();
  } catch(e) {
    return Alert.alert('장애가 발생했습니다. 다시 시도해주세요.');
  }
};