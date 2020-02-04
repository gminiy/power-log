import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LogoutButton = ({ navigation }) => {
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('ResolveAuth');
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={logout}
    >
      <Text style={styles.text}>로그아웃</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: wp('3%')
  },
  
  text: {
    color: 'white',
    alignSelf: 'center',

  }
});

export default LogoutButton;