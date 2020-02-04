import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import LoadingModal from './LoadingModal';
import { Context as AuthContext} from '../context/AuthContext';
import urls from '../common/urls';
import ErrorModal from '../modals/ErrorModal';

const DeleteExerciseModal = ({ isVisible, setIsVisible, id, name, dispatch }) => {
  const { state: { token } } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: null, errorModalVisible: false });

  const deleteExercise = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${urls.deleteExercise}/${id}`,
        {
          method: 'DELETE',
          headers: {
            token,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) throw Error(response.status);

      return dispatch({ type: 'delete_exercise', payload: { id } });
    } catch (error) {
      setError({ error, errorModalVisible: true });
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
          <Text style={styles.text}>{name}에 관한 모든 데이터가 삭제됩니다. 삭제하시겠습니까?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={deleteExercise}
            >
              <Text style={styles.buttonText}>삭제</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsVisible(false)}
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
    padding: wp('4%'),
    justifyContent: 'center'

  },
  text: {
    fontSize: wp('4.3%')
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('45%'),
    alignSelf: 'flex-end',
    marginTop: hp('3%')
  },
  button: {
    marginTop: hp('2%'),
    width: wp('21%'),
    height: hp('4.3%'),
    borderRadius: 5,
    backgroundColor: '#7B6E66',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: wp('4.5%'),
    color: '#fffaf0'
  }
});

export default DeleteExerciseModal;