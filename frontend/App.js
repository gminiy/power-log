import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { setNavigator } from './src/common/navigationRef';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import ExerciseListScreen from './src/screens/ExerciseListScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import SetListScreen from './src/screens/SetListScreen';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
  }),
  mainFlow: createStackNavigator({
    ExerciseList: ExerciseListScreen,
    SetList: SetListScreen,
  }),
});

const App = createAppContainer(switchNavigator); 

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => { setNavigator(navigator) }}/>
    </AuthProvider>
  );
};