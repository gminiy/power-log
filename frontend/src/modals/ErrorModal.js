import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

const AddExerciseModal = ({ error, setError }) => {
  return (
    <>
      <Modal
        isVisible={error.errorModalVisible}
      >
        <View style={styles.container}>
          <Text style={styles.text}>문제가 발생한것 같아요.</Text>
          <Text style={styles.text}>다시 시도해주세요.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setError({ error: null, errorModalVisible: false });
            }}
          >
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
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
    height: hp('18%'),
    borderRadius: 5,
    padding: wp('4%')
  },
  text: {
    fontSize: wp('4.3%')
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

export default AddExerciseModal;