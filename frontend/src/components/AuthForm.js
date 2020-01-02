import React, { useState, useContext } from 'react';
import { Text, StyleSheet, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Context as AuthContext } from '../context/AuthContext';
import Button from './Button';

const AuthForm = ({ type }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { register, login } = useContext(AuthContext);

  return (
    <>
      <Text style={styles.logo}>
        Power Log
      </Text>
      <TextInput
        style={styles.input} 
        placeholder={"아이디"}
        value={id}
        onChangeText={setId}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input} 
        placeholder={"비밀번호"}
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {type === 'register' && (
        <TextInput
          style={styles.input} 
          placeholder={"비밀번호 확인"}
          value={passwordConfirm}
          secureTextEntry={true}
          onChangeText={setPasswordConfirm}
          autoCapitalize="none"
          autoCorrect={false}
        />
      )}
      {type === 'register' ? (
        <Button styles={buttonStyles} title="가입하기" onPress={() => register({ id, password })} />
      ) : (
        <Button styles={buttonStyles} title="로그인" onPress={() => login({ id, password })} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    fontSize: wp('10%'),
    marginBottom: hp('1%')
  },
  input: {
    borderBottomWidth : 0.5,
    borderColor: '#888',
    width: wp('70%'),
    height: hp('8%'),
    paddingLeft: wp('3%'),
    fontSize: wp('3.5%')
  },
});

const buttonStyles = StyleSheet.create({
  button: {
    width: wp('70%'),
    height: hp('5.3%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: wp('4.5%'),
  }
});

export default AuthForm;