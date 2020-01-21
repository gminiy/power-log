import React, { useState, useReducer } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import urls from '../common/urls'
import { AntDesign } from '@expo/vector-icons';
import AddExerciseModal from '../modals/AddExerciseModal';
import LogoutButton from '../components/LogoutButton';
import useFetch from '../hooks/useFetch';
import Exercise from '../components/exercises/Exercise';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddExerciseButton from '../components/exercises/AddExerciseButton';


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
      return { ...state, exercises: action.payload.concat(state.exercises)};
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
      if (error) {
        return dispatch({ type: 'set_error', payload: error });
      }
      return dispatch({ type: 'set_exercises', payload: data });
    }
  );
  
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
    <>
      {loading ? (
        <ActivityIndicator size="large" color="#7B6E66" style={{ flex: 1 }}/>
      ) : (
        <View>
          <AddExerciseModal
          isVisible={addExerciseModalVisible}
          setIsVisible={setAddExerciseModalVisable}
          dispatch={dispatch}
          />
          <FlatList
            data={state.exercises}
            keyExtractor={(exercise) => `${exercise.id}`}
            renderItem={({ item, index }) => {          
              return (
                <Exercise
                  item={item}
                  index={index}
                  navigation={navigation}
                />
              );
            }}
          />
        <AddExerciseButton
          setAddExerciseModalVisable={setAddExerciseModalVisable}
        />
      </View>
    )} 
    </>
  );
};

ExercisesScreen.navigationOptions = ({ navigation }) => {        
  return {
    title: '파워로그',
    headerLeft: () => {
      return (
        <MaterialCommunityIcons
          name="dumbbell"
          color='#fffaf0'
          size={wp('6.5%')}
          style={{ marginLeft: wp('4%')}}
        />
      )
    },
    headerStyle: {
      backgroundColor: "#111111",
      marginBottom: hp('2%')
    },
    headerRight: () => (
      <>
        <LogoutButton navigation={navigation}/>
      </>
    ),
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#fffaf0',
      fontSize: wp('5.5%')
    }
  };
}

export default ExercisesScreen;