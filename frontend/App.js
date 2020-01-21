import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { setNavigator } from './src/common/navigationRef';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import ExercisesScreen from './src/screens/ExercisesScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
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
      Exercises: ExercisesScreen,
      ExerciseTabs: createBottomTabNavigator({
        Track: TrackScreen,
        History: HistoryScreen,
        Chart: ChartScreen,
      })
    },
    {
      defaultNavigationOptions: ({ navigation }) => {
        const title = navigation.getParam('name');
        
        return {
          title,
          headerStyle: {
            backgroundColor: "#111111",
            marginBottom: hp('2%')
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fffaf0',
            fontSize: wp('5.5%')
          },
          headerTintColor: 'white'
        };
      }
    }
  ),
  Error: ErrorScreen,
});

const App = createAppContainer(switchNavigator); 

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => { setNavigator(navigator) }}/>
    </AuthProvider>
  );
};