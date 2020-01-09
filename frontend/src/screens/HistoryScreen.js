import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HistoryScreen = ({ navigation }) => {
  return (
    <Text>{navigation.getParam('id')}</Text>
  );
};

export default HistoryScreen;