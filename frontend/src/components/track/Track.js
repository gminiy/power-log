import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Track = ({ item, index, setSelectedItem, isSelected }) =>  {
  return (
    <TouchableWithoutFeedback
      onPress={() => isSelected ? setSelectedItem(null) : setSelectedItem(item)}
    >
      <View style={[styles.container, isSelected && {backgroundColor: '#f5f5f5'} ]}>
        <View style={styles.setContainer}>
          <View style={styles.setTextContainer}>
            <Text style={styles.text}>{index + 1}</Text>
          </View>
          <Text style={styles.unit}> 세트</Text>
        </View>
        <View style={styles.weightContainer}>
          <View style={styles.weightTextContainer}>
            <Text style={styles.text}>{item.weight}</Text>
          </View>
          <Text style={styles.unit}> KG</Text>
        </View>
        <View style={styles.repsContainer}>
          <View style={styles.repsTextContainer}>
            <Text style={styles.text}>{item.reps}</Text>
          </View>
          <Text style={styles.unit}> 회</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('85%'),
    height: hp('6.5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor:'#9c8856'
  },
  setContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: wp('19%')
  },
  setTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: wp('10%')
  },
  weightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: wp('25%')
  },
  weightTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: wp('13%')
  },
  repsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: wp('19%')
  },
  repsTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: wp('10%')
  },
  text: {
    fontSize: wp('6%'),
  },
  unit: {
    fontSize: wp('3.5%'),
    color: '#666666'
  }
});

export default Track;