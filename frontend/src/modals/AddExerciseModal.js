import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import LoadingModal from './LoadingModal';
import Button from '../components/Button';
import { Context as AuthContext} from '../context/AuthContext';
import urls from '../common/urls';

const AddExerciseModal = ({ isVisible, setIsVisible, dispatch }) => {
  const { state: { token } } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [isValidate, setIsValidate] = useState(true);
  const [isAlreadyExist, setIsAlreadyExist] = useState(false);
  const [loading, setLoading] = useState(false);

  const addExercise = async () => {
    try {
      if (!name) return setIsValidate(false);
      setIsValidate(true);
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
      setIsAlreadyExist(false);
      closeModal();
      
      const exercise = await response.json();

      dispatch({ type: 'set_exercises', payload: [exercise] });
    } catch (error) {
      if (error.message === '409') {
        return setIsAlreadyExist(true);
      }
      return dispatch({ type: 'set_error', payload: error });
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setName('');
    setIsVisible(false);
  }

  return (
    <>
      <LoadingModal isVisible={loading} />
      <Modal
        isVisible={isVisible}
        onRequestClose={closeModal}
        onBackdropPress={closeModal}
      >
        <View style={styles.container}>
          <Text style={styles.text}>추가할 운동의 이름을 입력해주세요.</Text>
          <TextInput
            style={styles.input} 
            placeholder={"운동 이름"}
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
          />
          {!isValidate && (
            <Text style={styles.warningText}>이름은 최소한 한글자 이상이어야 합니다.</Text>
          )}          
          {isAlreadyExist && (
            <Text style={styles.warningText}>이미 등록한 운동입니다.</Text>
          )}
          <Button
            title="추가"
            styles={buttonStyles}
            onPress={() => {
              addExercise();
            }}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignSelf: 'center',
    width: wp('80%'),
    height: hp('24%'),
    borderRadius: 5,
    padding: wp('4%')
  },
  text: {
    fontSize: wp('4.3%')
  },
  warningText: {
    color: '#e15249',
    alignSelf: 'flex-end',
    marginTop: hp('0.5%')
  },
  input: {
    marginTop: hp('2%'),
    borderColor: '#888',
    width: wp('70%'),
    height: hp('6%'),
    paddingLeft: wp('3%'),
    fontSize: wp('3.5%'),
    backgroundColor: '#f5f5f5'
  }
});

const buttonStyles = StyleSheet.create({
  button: {
    marginTop: hp('2%'),
    width: wp('21%'),
    height: hp('4.3%'),
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#7B6E66'
  },
  title: {
    fontSize: wp('4.5%'),
    color: '#fffaf0'
  }
});

export default AddExerciseModal;