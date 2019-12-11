import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/login';


const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
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