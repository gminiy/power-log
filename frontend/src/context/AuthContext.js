import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import client from '../api/client';
import { navigate } from '../common/navigationRef';
import urls from '../common/urls';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { error: null, token: action.payload };
    case 'set_error':
      return { ...state, error: action.payload }
    default:
      return state;
  }
};

const register = dispatch => async ({ id, password }) => {
  try {
    const response = await client.post(urls.register, { id, password });
    const token = response.data.token;
    await AsyncStorage.setItem('token', token);

    dispatch({ type: 'login', payload: token });

    return navigate('ExerciseList');
  } catch (error) {
    return dispatch({ type: 'set_error', payload: error });
  }
};

const login = dispatch => async ({ id, password }) => {
  try {
    //const response = await client.post(urls.login, { id, password });
    const response = await fetch(urls.login, {
      method: 'POST',
      body: { id, password }
    });

    if(!response.ok) throw Error(response.status);

    const token = await response.json();

    //await AsyncStorage.setItem('token', token);

    dispatch({ type: 'login', payload: token });

    return navigate('ExerciseList');
  } catch (error) {
    return dispatch({ type: 'set_error', payload: error });
  }
};

const tryLocalLogin = dispatch => async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const response = await fetch(urls.checkAuth,{
        headers: { token }
      });

      await response.json();

      dispatch({ type: 'login', payload: token });

      return navigate('ExerciseList');
    } else {
      return navigate('Login');
    }
  } catch (error) {
    return dispatch({ type: 'set_error', payload: error });
  }
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { register, login, tryLocalLogin },
  { token: null, error: null }
);