import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TrackButton = ({ title, style, onPress }) =>  {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={[styles.button,
        style === 'add' && styles.addButton,
        style === 'init' && styles.initButton,
        style === 'update' && styles.updateButton,
        style === 'delete' && styles.deleteButton,
      ]}>
        <Text style={[styles.title,
          style === 'add' && styles.addTitle,
          style === 'init' && styles.initTitle,
          style === 'update' && styles.updateTitle,
          style === 'delete' && styles.deleteTitle,
        ]}>{title}</Text>
      </TouchableOpacity>
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
  addButton: {
    backgroundColor: '#7b6d64'
  },
  initButton: {
    backgroundColor: '#d7d2cb'
  },
  updateButton: {
    backgroundColor: '#104529'
  },
  deleteButton: {
    backgroundColor: '#f55b6b'
  },
  title: {
    fontWeight: 'bold',
    fontSize: wp('4%')
  },
  addTitle: {
    color: 'white'
  },
  initTitile: {
    color: '#7b6e66'
  },
  updateTitle: {
    color: 'white'
  },
  deleteTitle: {
    color: 'white'
  }
});

export default TrackButton;