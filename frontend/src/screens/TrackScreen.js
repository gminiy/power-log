import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TrackScreen = ({ navigation }) => {
  const [weight, setWeight] = useState();
  const [reps, setReps] = useState();

  return (
    <>
      <TextInput
        style={styles.input} 
        placeholder="무게"
        value={weight}
        onChangeText={setWeight}
        keyboardType={'numeric'}
      />
      <TextInput
        style={styles.input} 
        placeholder="횟수"
        value={reps}
        onChangeText={setReps}
        keyboardType={'numeric'}
      />
  </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    width: wp('30%'),
    height: hp('10%')
  }
})

export default TrackScreen;