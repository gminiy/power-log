import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
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

const login = dispatch => async ({ kakaoId }) => {
  try {
    const response = await fetch(urls.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ kakaoId })
    });

    if(!response.ok) throw Error(response.status);

    const { token } = await response.json();

    await AsyncStorage.setItem('token', token);

    dispatch({ type: 'login', payload: token });

    return navigate('Exercises');
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

      return navigate('Exercises');
    }

    return navigate('Login');
  } catch (error) {

    return dispatch({ type: 'set_error', payload: error });
  }
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { login, tryLocalLogin },
  { token: null, error: null }
);