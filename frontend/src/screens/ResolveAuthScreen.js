import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';

const ResolveAuthScreen = ({ navigation }) => {
  const { tryLocalLogin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalLogin();
  }, []);

  return (
    <View style={styles.screen}/>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'black',
  }
})

export default ResolveAuthScreen;