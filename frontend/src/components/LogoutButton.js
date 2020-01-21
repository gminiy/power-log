import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { AsyncStorage } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LogoutButton = ({ navigation }) => {
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('ResolveAuth');
  }
  return (
    <View style={{ marginRight: wp('3%')}}>
      <MaterialCommunityIcons
        name="logout-variant"
        color="#fffaf0"
        size={wp('7%')}
        onPress={logout}
      />
    </View>
  );
};

export default LogoutButton;