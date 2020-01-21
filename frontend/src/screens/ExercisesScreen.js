import React, { useState, useReducer } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import urls from '../common/urls'
import { AntDesign } from '@expo/vector-icons';
import AddExerciseModal from '../modals/AddExerciseModal';
import LogoutButton from '../components/LogoutButton';
import useFetch from '../hooks/useFetch';
import Exercise from '../components/exercises/Exercise';

const reducer = (state, action) => {
  switch (action.type) {
    case 'delete_exercise':
      return {
        ...state,
        exercises:
          state.exercises.filter(
            (exercise) => exercise.id !== action.payload.id
          )
      }
    case 'edit_exercise':
      const { id, newName } = action.payload;
      return { 
        ...state,
        exercises:
          state.exercises.map((exercise) => {
            return exercise.id === id
              ? {...exercise, name: newName}
              : exercise
          })
      };
    case 'set_exercises':
      return { ...state, exercises: state.exercises.concat(action.payload)};
    case 'set_error':
      return { ...state, error: action.payload }
    default:
      return state;
  }
};

const ExercisesScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, { exercises: [], error: null });
  const [addExerciseModalVisible, setAddExerciseModalVisable] = useState(false);
  const { error, loading } = useFetch(urls.getExercises,
    {},
    (data) => {
      console.log(data)
      if (error) {
        return dispatch({ type: 'set_error', payload: error });
      }
      console.log(data)
      return dispatch({ type: 'set_exercises', payload: data });
    }
  );
  
  // const addExercise = async (name) => {
  //     try {
  //       const response = await client.post(
  //         urls.addExercise,
  //         { name },
  //       );
  
  //       if (response.status === 200) dispatch({
  //         type: 'add_exercise',
  //         payload: response.data
  //       });
  
  //     } catch (error) {
  //       console.log(error);
  //       return dispatch({ type: 'set_error', payload: error });
  //     }
  // };
  
  // const editExercise = async ({ id, newName }) => {
  //   try {
  //     const response = await client.put(
  //       `${urls.updateExercise}/${id}`,
  //       { name: newName },
  //     );
  
  //     if (response.status === 200) dispatch({
  //       type: 'edit_exercise',
  //       payload: { id, newName }
  //     });
  
  //   } catch (error) {
  //     console.log(error);
  //     return dispatch({ type: 'set_error', payload: error });
  //   }
  // };
  
  // const deleteExercise = async (id) => {
  //   try {
  //     const response = await client.delete(
  //       `${urls.deleteExercise}/${id}`,
  //     );
  
  //     if (response.status === 200) dispatch({
  //       type: 'delete_exercise',
  //       payload: { id }
  //     });
  
  //   } catch (error) {
  //     console.log(error);
  //     return dispatch({ type: 'set_error', payload: error });
  //   }
  // };

  return (
    <View>
      {/* <AddExerciseModal
        isVisible={addExerciseModalVisible}
        setIsVisible={setAddExerciseModalVisable}
        addExercise={addExercise}
      /> */}
      <FlatList
        data={state.exercises}
        keyExtractor={(exercise) => `${exercise.id}`}
        renderItem={({ item }) => {
          return (
            <Exercise
              item={item}
              navigation={navigation}
            />
          );
        }}
      />
      <TouchableOpacity 
        onPress={() => setAddExerciseModalVisable(true)}
        style={styles.icon}
      >
        <AntDesign name="pluscircle" size={wp('15%')} color='#26306c' />
      </TouchableOpacity>
    </View>
  );
};

ExercisesScreen.navigationOptions = ({ navigation }) => {
  return {
    title: '파워로그',
    headerStyle: { marginBottom: hp('2%')},
    headerRight: () => (
      <LogoutButton navigation={navigation}/>
    )
  }
}


const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: hp('77%'),
    left: wp('77%'),
    width: wp('16%'),
    height: hp('10%')
  },
});

export default ExercisesScreen;