import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExerciseMenu from './ExerciseMenu';

const Exercise = ({ index, item, navigation: { navigate } }) => {
  const containerColors = ['#f5f5f5', 'white'];

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
          style={[
            styles.container,
            { backgroundColor: containerColors[index%2] }
          ]}
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
    width: wp('100%'),
    height: hp('12%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
    alignSelf: 'center'
  },
  title: {
    color: '#424242',
    fontSize: wp('4.5%'),
  }
});

export default Exercise;