import * as React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AuthTemplate from '../../components/auth/AuthTemplate';
import AuthForm from '../../components/auth/AuthForm';
import Button from '../../components/common/Button';

const LoginScreen = (props) => {
  return (
    <AuthTemplate>
      <AuthForm />
      <Text style={styles.text}>회원 가입하고 자신만의 운동 기록을 만들어 보세요.</Text>
      <Button styles={buttonStyles} onPress={onPress(props)} text="회원가입하기" />
    </AuthTemplate>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    fontSize: wp('3.5%')
  }
});

const onPress = (props) => {
  return () => {
    return props.navigation.navigate('Register');
  }
}

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

export default LoginScreen;