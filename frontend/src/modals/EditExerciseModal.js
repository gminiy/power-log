import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import LoadingModal from './LoadingModal';
import Button from '../components/Button';
import urls from '../common/urls';
import { Context as AuthContext} from '../context/AuthContext';

const EditExerciseModal = ({ isVisible, setIsVisible, id, originalName, dispatch }) => {
  const { state: { token } } = useContext(AuthContext);
  const [newName, setNewName] = useState(originalName);
  const [loading, setLoading] = useState(false);
  const [isValidate, setIsValidate] = useState(true);
  const [isExist, setIsExist] = useState(false);

  const editExercise = async () => {
    try {
      if (!newName) return setIsValidate(false);
      setIsValidate(true);
      setLoading(true);

      const response = await fetch(
        `${urls.updateExercise}/${id}`,
        {
          method: 'PUT',
          headers: {
            token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newName })
        },
      );

      if (!response.ok) throw Error(response.status);
      setIsExist(false);
      setIsVisible(false);

      dispatch({ type: 'edit_exercise', payload: { id, newName } });

    } catch (error) {
      if (error.message === '409') {
        return setIsExist(true);
      }
      return dispatch({ type: 'set_error', payload: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingModal isVisible={loading} />
      <Modal
        isVisible={isVisible}
        onBackButtonPress={() => setIsVisible(false)}
      >
        <View style={styles.container}>
          <Text>수정할 운동의 이름을 입력해주세요.</Text>
          <TextInput
            style={styles.input} 
            value={newName}
            onChangeText={setNewName}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {!isValidate && (
            <Text style={styles.warningText}>이름은 최소한 한글자 이상이어야 합니다.</Text>
          )}
          {isExist && (
            <Text style={styles.warningText}>이미 등록한 운동입니다.</Text>
          )}
          <Button
            title="수정"
            styles={buttonStyles}
            onPress={editExercise}
          />
          <Button
            title="취소"
            styles={buttonStyles}
            onPress={() => {
              setIsVisible(false);
              setIsExist(false);
              setNewName(originalName);
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

export default EditExerciseModal;