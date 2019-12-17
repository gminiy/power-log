import React, { useContext } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Exercises from '../../components/exercises/Exercises';

const ExercisesScreen = () => {
  return (
    <Exercises />
  );
}

export default ExercisesScreen;