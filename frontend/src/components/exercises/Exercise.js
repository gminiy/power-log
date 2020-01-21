import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExerciseMenu from './ExerciseMenu';

const Exercise = ({ item, navigation: { navigate } }) => {
  return (
    <View>
      {/* <EditExerciseModal
        isVisible={editExerciseModalVisible}
        setIsVisible={setEditExerciseModalVisable}
        id={exerciseId}
        name={exerciseName}
        editExercise={editExercise}
      />
      <DeleteExerciseModal
        isVisible={deleteExerciseModalVisible}
        setIsVisible={setDeleteExerciseModalVisable}
        id={exerciseId}
        name={exerciseName}
        deleteExercise={deleteExercise}
      /> */}
      <TouchableOpacity
        onPress={
          () => {
            navigate(
              'ExerciseTabs',
              { id: item.id, name: item.name }
            )
          }
        }
        style={styles.container}
      >
        <Text style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
      {/* <ExerciseMenu
        exerciseId={item.id}
        exerciseName={item.name}
        editExercise={editExercise}
        deleteExercise={deleteExercise}
      /> */}
  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: wp('96%'),
    height: hp('7%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF0F1',
    marginBottom: hp('0.5%'),
    borderRadius: 5,
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
    alignSelf: 'center'
  },
  title: {
    fontSize: wp('4.5%'),
  }
});

export default Exercise;