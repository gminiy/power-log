import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SelectBox from '../components/SelectBox';

const TestScreen = () => {
  const [item, setItem] = useState('volume');
  const data = ['volume', 'max-weight'];

  return (
    <>
      <SelectBox
        data={data}
        value={item}
        onSelect={({ item, index }) => {setItem(item)}}
      />
    </>
  );
};

export default TestScreen;