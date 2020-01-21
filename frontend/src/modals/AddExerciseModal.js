import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import Button from '../components/Button';
import { Context as AuthContext} from '../context/AuthContext';
import urls from '../common/urls';

const AddExerciseModal = ({ isVisible, setIsVisible, dispatch }) => {
  const { state: { token } } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const addExercise = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        urls.addExercise,
        {
          method: 'POST',
          headers: {
            token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name })
        },
      );

      if (!response.ok) throw Error(response.status);
      
      const exercise = await response.json();
      console.log(exercise)

      dispatch({ type: 'set_exercises', payload: exercise });

    } catch (error) {
      return dispatch({ type: 'set_error', payload: error });
    } finally {
      setLoading(false);
    }
};

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
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Button
          title="추가"
          styles={buttonStyles}
          onPress={() => {
            addExercise(name);
            setName('');
            setIsVisible(false);
          }}
        />
        <Button
          title="취소"
          styles={buttonStyles}
          onPress={() => {
            setName('');
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