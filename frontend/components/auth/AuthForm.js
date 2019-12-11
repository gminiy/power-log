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
      const userId = response.id;
      actions.setUserId(userId);
      
      return navigation.navigate('ExerciseList');
    } catch(e) {
      return Alert.alert('이상한 에러');
    }
  };

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
          <Button styles={buttonStyles} text="로그인"/>
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
    height: hp('5.3%%'),
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