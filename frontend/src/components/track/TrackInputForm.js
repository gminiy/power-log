import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TrackInputForm = ({ type, state, setState }) => {
  return (
    <>
    <View style={styles.titleContainer}>
      {type === 'weight' ? (
        <Text style={styles.title}>무게 :</Text>
      ) : (
        <Text style={styles.title}>횟수 :</Text>
      )}
    </View>
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="0"
        placeholderTextColor="lightgray"
        style={styles.input}
        value={state}
        onChangeText={setState}
        keyboardType={'numeric'}
      />
      {type === 'weight' ? (
        <Text style={styles.unit}>KG</Text>
      ) : (
        <Text style={styles.unit}>개</Text>
      )}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    width: wp('85%'),
    height: hp('5%'),
    alignSelf: 'center',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#9c8856',
    marginTop: hp('1%')
  },
  title: {
    fontSize: wp('4%')
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  input: {
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: wp('30%'),
    height: hp('8%'),
    fontSize: wp('8%'),
  },
  unit: {
    marginLeft: wp('3%'),
    fontSize: wp('6%')
  },
})

export default TrackInputForm;