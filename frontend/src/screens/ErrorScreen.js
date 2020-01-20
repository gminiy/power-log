import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';

const ErrorScreen = ({ navigation }) => {
  const error = navigation.getParam('error');

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 20, marginTop: 50 }}>{ error.message }</Text>
    </SafeAreaView>
  )
};

export default ErrorScreen;