import * as React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AuthTemplate from '../../components/auth/AuthTemplate';
import AuthForm from '../../components/auth/AuthForm';
import Button from '../../components/common/Button';

const RegisterScreen = ({ navigation }) => {
  return (
    <AuthTemplate>
      <AuthForm type="register"/>
      <Button styles={buttonStyles} onPress={onPress(navigation)} text="로그인하기" />
    </AuthTemplate>
  );
};

const onPress = (navigation) => {
  return () => {
    return navigation.navigate('Login');
  };
};

const buttonStyles = StyleSheet.create({
  button: {
    marginTop: hp('2%'),
    paddingLeft: wp('45%'),
  },
  buttonText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#495057',
    borderBottomWidth: 1,
    borderBottomColor: '#495057'
  }
});

export default RegisterScreen;