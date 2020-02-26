import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ResolveAuthScreen = () => {
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
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: 'black',
  }
});

export default ResolveAuthScreen;