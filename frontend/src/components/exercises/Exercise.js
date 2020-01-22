import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExerciseMenu from './ExerciseMenu';
import DeleteExerciseModal from '../../modals/DeleteExerciseModal';
const Exercise = ({ index, item, navigation: { navigate }, dispatch }) => {
  const [editModalVisible, setEditModalVisable] = useState(false);
  const [deleteModalVisible, setDeleteModalVisable] = useState(false);
  const containerColors = ['#f5f5f5', 'white'];

  return (
    <View>
      {/* <EditExerciseModal
        isVisible={editModalVisible}
        setIsVisible={setEditModalVisable}
        id={item.id}
        name={item.name}
        // editExercise={editExercise}
      /> */}
      <DeleteExerciseModal
        isVisible={deleteModalVisible}
        setIsVisible={setDeleteModalVisable}
        id={item.id}
        name={item.name}
        dispatch={dispatch}
      />
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
        <ExerciseMenu
          setDeleteModalVisable={setDeleteModalVisable}
          setEditModalVisable={setEditModalVisable}
        />
      </TouchableOpacity>
    </View>
  );
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