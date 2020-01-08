import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import Button from '../components/Button';
import { Context as ExerciseContext } from '../context/ExerciseContext';

const AddExerciseModal = ({ isVisible, setIsVisible }) => {
  const { addExercise } = useContext(ExerciseContext);
  const [exerciseName, setExerciseName] = useState('');

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={() => setIsVisible(false)}
    >
      <View style={styles.container}>
        <Text>추가할 운동의 이름을 입력해주세요.</Text>
        <TextInput
          style={styles.input} 
          placeholder={"운동 이름"}
          value={exerciseName}
          onChangeText={setExerciseName}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Button
          title="추가"
          styles={buttonStyles}
          onPress={() => {
            addExercise(exerciseName);
            setExerciseName('');
            setIsVisible(false);
          }}
        />
        <Button
          title="취소"
          styles={buttonStyles}
          onPress={() => {
            setExerciseName('');
            setIsVisible(false);
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignSelf: 'center',
    width: wp('80%'),
    height: hp('40%'),
    borderRadius: 5,
  },
  input: {
    borderBottomWidth : 0.5,
    borderColor: '#888',
    width: wp('70%'),
    height: hp('8%'),
    paddingLeft: wp('3%'),
    fontSize: wp('3.5%')
  },
});

const buttonStyles = StyleSheet.create({
  button: {
    width: wp('70%'),
    height: hp('5.3%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: wp('4.5%'),
  }
});

export default AddExerciseModal;