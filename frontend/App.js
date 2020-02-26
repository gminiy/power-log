import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { setNavigator } from './src/common/navigationRef';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LoginScreen from './src/screens/LoginScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import ExercisesScreen from './src/screens/ExercisesScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import TrackScreen from './src/screens/TrackScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ChartScreen from './src/screens/ChartScreen';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  Login: LoginScreen,
  MainStacks: createStackNavigator(
    { 
      Exercises: ExercisesScreen,
      ExerciseTabs: createMaterialTopTabNavigator(
        {
          Track: {
            screen: TrackScreen,
            navigationOptions: {
             title: '기록하기'
            } 
          },
          History: {
            screen: HistoryScreen,
            navigationOptions: {
              title: '지난 기록'
            }
          },
          Chart: {
            screen: ChartScreen,
            navigationOptions: {
              title: '그래프'
            }
          }
        },
        {
          tabBarOptions: {
            labelStyle: {
              fontSize: wp('3%'),
              fontWeight: 'bold'
            },
            tabStyle: {
              height: hp('7%')
            },
            style: {
              backgroundColor: 'white',
            },
            indicatorStyle: {
              backgroundColor: '#9c8856',
              height: hp('0.5%')
            },
            inactiveTintColor: '#666666',
            activeTintColor: '#9c8856',
          }
        }
      )
    },
    {
      defaultNavigationOptions: ({ navigation }) => {
        const title = navigation.getParam('name');
        
        return {
          title,
          headerStyle: {
            backgroundColor: "#111111",
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
});

const App = createAppContainer(switchNavigator); 

export default () => {
  return (
      <AuthProvider>
        <App ref={(navigator) => { setNavigator(navigator) }}/>
      </AuthProvider>
  );
};