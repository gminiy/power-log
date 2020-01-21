import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableWithoutFeedback } from 'react-native';
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

      dispatch({ type: 'set_exercises', payload: [exercise] });

    } catch (error) {
      return dispatch({ type: 'set_error', payload: error });
    } finally {
      setLoading(false);
    }
  };

  const cancel = () => {
    setName('');
    setIsVisible(false);
  }

  return (
      <Modal
        isVisible={isVisible}
        onRequestClose={cancel}
        onBackdropPress={cancel}
        swipeDirection="left"
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
          <Button
            title="추가"
            styles={buttonStyles}
            onPress={() => {
              addExercise(name);
              cancel();
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
    height: hp('23%'),
    borderRadius: 5,
    padding: wp('4%')
  },
  text: {
    fontSize: wp('4.3%')
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