import React, { useContext } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import UserContext from '../../context/user';

const ExerciseListScreen = () => {
  const { state } = useContext(UserContext);
  return (
    <Text>{state.userId} 님 웰컴</Text>
  );
}

export default ExerciseListScreen;