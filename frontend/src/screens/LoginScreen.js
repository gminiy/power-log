import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NavLink from '../components/NavLink';
import AuthForm from '../components/AuthForm';

const LoginScreen = () => (
  <View style={styles.container}>
    <AuthForm type="login"/>
    <Text>아직 회원이 아니신가요? </Text>
    <Text>간편하게 가입하고 운동을 기록해보세요.</Text>
    <NavLink text="회원가입" styles={navStyles} routeName="Register" />
  </View>
);

LoginScreen.navigationOptions = () => {
  return {
    header: null,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('15%')
  },
});

const navStyles = StyleSheet.create({
  nav: {
    alignSelf: 'flex-end',
    marginTop: hp('1%'),
    marginRight: wp('18%'),
  },
  text: {
    fontSize: wp('4%'),
    color: 'blue'
  },
});


export default LoginScreen;