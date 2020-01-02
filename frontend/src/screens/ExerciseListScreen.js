import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

const ExerciseListScreen = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => {}} style={styles.icon}>
        <Icon name="md-add-circle-outline" size={wp('16%')} color='#26306c' />
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