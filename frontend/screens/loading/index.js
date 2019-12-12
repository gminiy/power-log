import React, { useEffect, useContext } from 'react';
import {
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import UserContext from '../../context/user';
import { getData } from '../../src/lib/asyncStorage';
import useFetch from '../../src/lib/useFetch';
import urls from '../../src/lib/urls';

const LoadingScreen = ({ navigation }) => {
  const { actions } = useContext(UserContext);
  useEffect(async () => await checkAuth(), []);
  const checkAuth = async () => {
    const token = await getData('powerLogToken');

    if (!token) return navigation.navigate('Login');

    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'jwt': token,
      },
    }

    const response = await useFetch(urls.checkAuth, options);

    switch(response.status) {
      case 401:
        return navigation.navigate('Login');
      case 500:
        return Alert.alert('장애가 발생했습니다. 다시 시도해주세요.');
    }

    const body = await response.json();

    const userId = body.id;
    await actions.setUserId(userId);
    
    navigation.navigate('ExerciseList');
  }

  return (
    <View style={{flex:1, justifyContent: 'center'}}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default LoadingScreen;