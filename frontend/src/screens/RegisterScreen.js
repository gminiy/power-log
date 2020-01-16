import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from '../components/Button';
import AuthForm from '../components/AuthForm';

const RegisterScreen = ({ navigation }) => (
  <View style={styles.container}>
    <AuthForm type="register"/>
    <Text>이미 회원이시라면</Text>
    <Button
      title="로그인하러"
      styles={buttonStyles}
      onPress={() => navigation.navigate('Login')} />
  </View>
);

RegisterScreen.navigationOptions = () => {
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

const buttonStyles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    marginTop: hp('1%'),
    marginRight: wp('18%'),
  },
  title: {
    fontSize: wp('4%'),
    color: 'blue'
  },
});


export default RegisterScreen;