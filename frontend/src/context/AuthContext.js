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
    const localToken = await AsyncStorage.getItem('token');

    if (localToken) {
      const response = await fetch(urls.checkToken,{
        headers: { token: localToken }
      });

      if (!response.ok) throw Error(response.status);

      const { isReissued, token: reissuedToken } = await response.json();

      if (isReissued) await AsyncStorage.setItem('token', reissuedToken);

      const token = isReissued ? reissuedToken : localToken;
      dispatch({ type: 'login', payload: token });

      return navigate('Exercises');
    }

    return navigate('Login');
  } catch (error) {
    // expired token
    if (error.message === '403') {
      return navigate('Login');
    }

    return dispatch({ type: 'set_error', payload: error });
  }
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { login, tryLocalLogin },
  { token: null, error: null }
);