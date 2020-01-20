import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { setNavigator } from './src/common/navigationRef';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import ExercisesScreen from './src/screens/ExercisesScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as ExerciseProvider } from './src/context/ExerciseContext';
import TrackScreen from './src/screens/TrackScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ChartScreen from './src/screens/ChartScreen';
import ErrorScreen from './src/screens/ErrorScreen';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  LoginStacks: createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
  }),
  MainStacks: createStackNavigator(
    {
      ExerciseList: ExercisesScreen,
      ExerciseTabs: createBottomTabNavigator({
        Track: TrackScreen,
        History: HistoryScreen,
        Chart: ChartScreen,
      })
    },
    {
      defaultNavigationOptions: ({ navigation }) => {
        return {
          title: navigation.getParam('name')
        };
      }
    }
  ),
  Error: ErrorScreen,
}
);

const App = createAppContainer(switchNavigator); 

export default () => {
  return (
    <AuthProvider>
      <ExerciseProvider>
        <App ref={(navigator) => { setNavigator(navigator) }}/>
      </ExerciseProvider>
    </AuthProvider>
  );
};