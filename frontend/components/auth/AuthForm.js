import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Alert
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from '../common/Button';
import urls from '../../src/lib/urls';
import useFetch from '../../src/lib/useFetch';
import UserContext from '../../context/user';
import { storeData } from '../../src/lib/asyncStorage';

const AuthForm = ({ type, navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { actions } = useContext(UserContext);
  const onChangeId = value => setId(value);
  const onChangePassword = value => setPassword(value);
  const onChangePasswordConfirm = value => setPasswordConfirm(value);
  const registerOnPress = async () => {
    try {
      if (password !== passwordConfirm) return Alert.alert('비밀번호가 일치하지 않습니다.');
      const options = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          password
        }),
        method: 'POST'
      };
      const response = await useFetch(urls.register, options);

      switch(response.status) {
        case 400:
          return Alert.alert('id는 최소 3글자, 비밀번호는 최소 6글자입니다.');
        case 409:
          return Alert.alert('이미 존재하는 아이디 입니다.');
        case 500:
          throw response.message;
      }
      const token = response.headers.map.jwt;
      await storeData('powerLogToken', token);
      const body = await response.json();
      const userId = body.id;
      actions.setUserId(userId);
      actions.setToken(token);

      return navigation.navigate('Exercises');
    } catch(e) {
      console.log(e);
      return Alert.alert('장애가 발생하였습니다. 다시 시도해주세요.');
    };
  };

  const loginOnPress = async () => {
    try {
      const options = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          password
        }),
        method: 'POST'
      };

      const response = await useFetch(urls.login, options);

      switch(response.status) {
        case 400:
          return Alert.alert('아이디와 비밀번호를 입력해주세요.');
        case 401:
          return Alert.alert('아이디와 비밀번호가 일치하지 않습니다.');
        case 500:
          return Alert.alert('장애.');
      }
      const token = response.headers.map.jwt;
      await storeData('powerLogToken', token);
      const body = await response.json();
      const userId = body.id;
      actions.setUserId(userId);
      actions.setToken(token);
      return navigation.navigate('Exercises');
    } catch(e) {
      console.log(e);
      return Alert.alert('장애가 발생하였습니다. 다시 시도해주세요.');
    };
  }

  return (
      <View style={styles.formArea}>
        <TextInput 
          style={styles.textForm} 
          placeholder={"아이디"}
          value={id}
          onChangeText={onChangeId}/>
        <TextInput 
          style={styles.textForm} 
          placeholder={"비밀번호"}
          value={password}
          secureTextEntry={true}
          onChangeText={onChangePassword}/>
        {type === 'register' && (
          <TextInput 
          style={styles.textForm} 
          placeholder={"비밀번호 확인"}
          value={passwordConfirm}
          secureTextEntry={true}
          onChangeText={onChangePasswordConfirm}/>
        )}
        {type === 'register' ? (
          <Button styles={buttonStyles} onPress={registerOnPress} text="가입하기"/>
        ) : (
          <Button styles={buttonStyles} onPress={loginOnPress} text="로그인"/>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  formArea: {
    width: '70%',
  },
  textForm: {
    borderBottomWidth : 0.5,
    borderColor: '#888',
    borderRadius: 5,
    height: hp('5%'),
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10,
    fontSize: wp('3')
  }
});

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    paddingLeft: 5,
    paddingRight: 5,
    height: hp('5.3%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1
  },
  buttonText: {
    fontSize: wp('4.5%'),
    color: 'black'
  }
});

export default AuthForm;