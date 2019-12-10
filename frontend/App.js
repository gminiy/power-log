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


const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
});

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  return (
      <AppContainer />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'gray',
    fontSize: 36,
    fontWeight: '500'
  },
});

export default App;