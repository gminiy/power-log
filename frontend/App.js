import React, { useState } from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import ExerciseListScreen from './screens/exerciseList';

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
    ExerciseList: {
      screen: ExerciseListScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
    initialRouteName: 'Login'
  },
);

const AppContainer = createAppContainer(AppNavigator); 

const App = () => {
  return (
      <AppContainer />
  );
};

export default App;