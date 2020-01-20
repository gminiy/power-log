import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import client from '../api/client';
import urls from '../common/urls'
import { AntDesign } from '@expo/vector-icons';
import AddExerciseModal from '../modals/AddExerciseModal';
import Button from '../components/Button';
import ExerciseMenu from '../components/ExerciseMenu';
import LogoutButton from '../components/LogoutButton';

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
    case 'add_exercise':
      return { ...state, exercises: state.exercises.concat(action.payload)}
    case 'init_exercises':
      return { error: null, exercises: action.payload };
    case 'set_error':
      return { ...state, error: action.payload }
    default:
      return state;
  }
};

const ExercisesScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, { exercises: null, error: null });
  const [addExerciseModalVisible, setAddExerciseModalVisable] = useState(false);

  useEffect(() => {
    initExercises();
  }, []);

  const initExercises = async () => {
    try {
      const response = await client.get(urls.getExercises);
      const { data } = response;
  
      return dispatch({ type: 'init_exercises', payload: data });
    } catch (error) {
      console.log(error);
      return dispatch({ type: 'set_error', payload: error });
    }
  };
  
  const addExercise = async (name) => {
      try {
        const response = await client.post(
          urls.addExercise,
          { name },
        );
  
        if (response.status === 200) dispatch({
          type: 'add_exercise',
          payload: response.data
        });
  
      } catch (error) {
        console.log(error);
        return dispatch({ type: 'set_error', payload: error });
      }
  };
  
  const editExercise = async ({ id, newName }) => {
    try {
      const response = await client.put(
        `${urls.updateExercise}/${id}`,
        { name: newName },
      );
  
      if (response.status === 200) dispatch({
        type: 'edit_exercise',
        payload: { id, newName }
      });
  
    } catch (error) {
      console.log(error);
      return dispatch({ type: 'set_error', payload: error });
    }
  };
  
  const deleteExercise = async (id) => {
    try {
      const response = await client.delete(
        `${urls.deleteExercise}/${id}`,
      );
  
      if (response.status === 200) dispatch({
        type: 'delete_exercise',
        payload: { id }
      });
  
    } catch (error) {
      console.log(error);
      return dispatch({ type: 'set_error', payload: error });
    }
  };

  return (
    <View>
      <AddExerciseModal
        isVisible={addExerciseModalVisible}
        setIsVisible={setAddExerciseModalVisable}
        addExercise={addExercise}
      />
      <FlatList
        data={state.exercises}
        keyExtractor={(exercise) => `${exercise.id}`}
        renderItem={({ item }) => {
          return (
            <Button 
              title={item.name}
              styles={buttonStyles}
              onPress={() => navigation.navigate(
                'ExerciseTabs',
                { id: item.id, name: item.name }
              )}
            >
              <ExerciseMenu
                exerciseId={item.id}
                exerciseName={item.name}
                editExercise={editExercise}
                deleteExercise={deleteExercise}
              />
            </Button>
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

const buttonStyles = StyleSheet.create({
  button: {
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

export default ExercisesScreen;