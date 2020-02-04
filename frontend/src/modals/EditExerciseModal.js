import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import LoadingModal from './LoadingModal';
import urls from '../common/urls';
import { Context as AuthContext} from '../context/AuthContext';
import ErrorModal from '../modals/ErrorModal';

const EditExerciseModal = ({ isVisible, setIsVisible, id, originalName, dispatch }) => {
  const { state: { token } } = useContext(AuthContext);
  const [newName, setNewName] = useState(originalName);
  const [loading, setLoading] = useState(false);
  const [isValidate, setIsValidate] = useState(true);
  const [isExist, setIsExist] = useState(false);
  const [error, setError] = useState({ error: null, errorModalVisible: false });

  const editExercise = async () => {
    try {
      if (!newName) return setIsValidate(false);
      if (newName === originalName) {
        setIsExist(false);
        setIsVisible(false);

        return;
      }
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
      if (error.message === '409') return setIsExist(true);

      setError({ error, errorModalVisible: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ErrorModal error={error} setError={setError} />
      <LoadingModal isVisible={loading} />
      <Modal
        isVisible={isVisible}
        onBackButtonPress={() => setIsVisible(false)}
      >
        <View style={styles.container}>
          <Text style={styles.text}>수정할 운동의 이름을 입력해주세요.</Text>
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={editExercise}
            >
              <Text style={styles.buttonText}>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setIsVisible(false);
                setIsExist(false);
                setNewName(originalName);
              }}
            >
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
          </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('45%'),
    alignSelf: 'flex-end',
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
  },
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
  buttonText: {
    fontSize: wp('4.5%'),
    color: '#fffaf0'
  }
});

const buttonStyles = StyleSheet.create({

});

export default EditExerciseModal;