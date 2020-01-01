import { AsyncStorage } from 'react-native';
import { Alert } from 'react-native';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
    Alert.alert('장애가 발생했습니다. 다시 시도해주세요');
  }
}

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch(e) {
    console.log(e);
    Alert.alert('장애가 발생했습니다. 다시 시도해주세요');
  }
}