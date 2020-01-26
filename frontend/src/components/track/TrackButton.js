import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TrackButton = ({ title, style, onPress }) =>  {
  return (
    <View style={styles.container}>
      {style === 'dark' ? (
        <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: '#7b6d64' }]}>
          <Text style={[styles.title, { color: 'white' }]}>{title}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: '#d7d2cb' }]}>
          <Text style={[styles.title, { color: '#7b6e66'}]}>{title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp('3%')
  },
  button: {
    width: wp('38%'),
    height: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  title: {
    fontWeight: 'bold',
    fontSize: wp('4%')
  }
});

export default TrackButton;