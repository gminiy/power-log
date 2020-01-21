import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { setNavigator } from './src/common/navigationRef';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import ExercisesScreen from './src/screens/ExercisesScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import LogoutButton from './src/components/LogoutButton';
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
        const title = navigation.getParam('name') || '파워로그';
        
        return {
          title,
          headerLeft: () => {
            return (
              <MaterialCommunityIcons
                name="dumbbell"
                color='#fffaf0'
                size={wp('6.5%')}
                style={{ marginLeft: wp('4%')}}
              />
            )
          },
          headerStyle: {
            backgroundColor: "#111111",
            marginBottom: hp('3%')
          },
          headerRight: () => (
            <LogoutButton navigation={navigation}/>
          ),
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fffaf0',
            fontSize: wp('5.5%')
          }
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