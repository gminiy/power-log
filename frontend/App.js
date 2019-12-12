import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import ExerciseListScreen from './screens/exerciseList';
import LoadingScreen from './screens/loading';
import { UserProvider } from './context/user';

const AppNavigator = createStackNavigator(
  {
    Loading: {
      screen: LoadingScreen,
    },
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
    initialRouteName: 'Loading'
  },
);

const AppContainer = createAppContainer(AppNavigator); 

const App = () => {
  return (
      <UserProvider>
        <AppContainer />
      </UserProvider>
  );
};

export default App;