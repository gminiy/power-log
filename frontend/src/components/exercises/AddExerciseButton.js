import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';

const AddExerciseButton = ({ setAddExerciseModalVisable }) => {
  return (
    <>
      <TouchableOpacity 
        onPress={() => setAddExerciseModalVisable(true)}
        style={styles.icon}
      >
        <Icon name="pluscircle" size={wp('15%')} color='#7B6E66' />
      </TouchableOpacity>
    </>
  )
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: hp('75%'),
    left: wp('77%'),
    width: wp('16%'),
    height: hp('10%')
  },
});

export default AddExerciseButton;