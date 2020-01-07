import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';

const ExerciseListScreen = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => {}} style={styles.icon}>
        <AntDesign name="pluscircleo" size={wp('16%')} color='#26306c' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: hp('75%'),
    left: wp('75%'),
    width: wp('16%'),
    height: hp('10%')
  },
});

export default ExerciseListScreen;