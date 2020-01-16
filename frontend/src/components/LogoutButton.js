import React, { useState, useContext } from 'react';
import { Text, StyleSheet, TextInput } from 'react-native';
import { AsyncStorage } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from './Button';

const LogoutButton = ({ navigation }) => {
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('ResolveAuth');
  }
  return (
    <Button
      title='로그아웃'
      onPress={logout}
      styles={buttonStyles}
    />
  )
};

const buttonStyles = StyleSheet.create({
  title: {
    fontSize: wp('3%'),
  },
  button: {
    
  }
})


export default LogoutButton;