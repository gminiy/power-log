import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Button from '../common/Button';

const AuthForm = () => {
  return (
      <View style={styles.formArea}>
        <TextInput 
          style={styles.textForm} 
          placeholder={"ID"}/>
        <TextInput 
          style={styles.textForm} 
          placeholder={"Password"}/>
        <Button text='로그인'/>
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

export default AuthForm;