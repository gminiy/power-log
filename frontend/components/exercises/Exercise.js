import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Exercise = ({ name, id }) => {
  const onPress = () => {
    console.log(id);
  }
  
  return (
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#eee',
    borderBottomWidth: 1,
    height: hp('7%'),
    marginBottom: hp('0.5%'),
    padding: wp('3%')
  },
  text: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
  }
});

export default Exercise;