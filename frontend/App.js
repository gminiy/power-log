import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { setNavigator } from './src/common/navigationRef';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import ExerciseListScreen from './src/screens/ExerciseListScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as ExerciseProvider } from './src/context/ExerciseContext';
import { Provider as SetHistoryProvider } from './src/context/SetHistoryContext';
import TrackScreen from './src/screens/TrackScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ChartScreen from './src/screens/ChartScreen';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  LoginStacks: createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
  }),
  MainStacks: createStackNavigator(
    {
      ExerciseList: ExerciseListScreen,
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
}
);

const App = createAppContainer(switchNavigator); 

export default () => {
  return (
    <AuthProvider>
      <ExerciseProvider>
        <SetHistoryProvider>
          <App ref={(navigator) => { setNavigator(navigator) }}/>
        </SetHistoryProvider>
      </ExerciseProvider>
    </AuthProvider>
  );
};