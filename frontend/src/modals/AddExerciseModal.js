import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import Button from '../components/Button';
import client from '../api/client';
import urls from '../common/urls';
import { Context as AuthContext } from '../context/AuthContext';

const requestAddExercise = async (token, exerciseName) => {
  try {
    return await client.post(
      urls.addExercise,
      { name: exerciseName },
      { headers: { token } }
    );
  } catch (error) {
    console.log(error);
  }
}

const AddExerciseModal = ({ isVisible, setIsVisible }) => {
  const { state: { token } } = useContext(AuthContext);
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
            console.log(token)
            requestAddExercise(token, exerciseName);
            setIsVisible(false);
            setExerciseName('');
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