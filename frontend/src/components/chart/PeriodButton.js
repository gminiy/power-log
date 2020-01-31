import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PeriodButton = ({ period, isOn, onPress }) =>  {
  return (
      <TouchableOpacity onPress={onPress} style={[styles.button, isOn && styles.onButton]}>
        <Text style={[styles.period, isOn && styles.onPeriod]}>{period}</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: wp('15%'),
    height: hp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 3
  },
  onButton: {
    backgroundColor: '#7b6d64'
  },
  period: {
    fontWeight: 'bold',
    fontSize: wp('4%')
  },
  onPeriod: {
    color: 'white'
  },
});

export default PeriodButton;