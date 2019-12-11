import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AuthTemplate = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoArea}>
        <Text style={styles.logo}>
          Power Log
        </Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  logo: {
    fontSize: wp('10%')
  },
});

export default AuthTemplate;