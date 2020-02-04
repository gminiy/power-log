import React, { useState, useReducer, useEffect, useContext } from 'react';
import { View, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import urls from '../common/urls';
import AddExerciseModal from '../modals/AddExerciseModal';
import LogoutButton from '../components/exercises/LogoutButton';
import Exercise from '../components/exercises/Exercise';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddExerciseButton from '../components/exercises/AddExerciseButton';
import { Context as AuthContext} from '../context/AuthContext';
import LoadingModal from '../modals/LoadingModal';
import ErrorModal from '../modals/ErrorModal';

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
      return { ...state, exercises: action.payload.concat(state.exercises)};
    case 'set_exercises':
      return { ...state, exercises: state.exercises.concat(action.payload)};
    case 'set_error':
      return { ...state, error: action.payload }
    default:
      return state;
  }
};

const ExercisesScreen = ({ navigation }) => {
  const pageSize = 15;
  const { state: { token } } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, { exercises: [], error: null });
  const [addExerciseModalVisible, setAddExerciseModalVisable] = useState(false);
  const [paginationInfo, setPagenationInfo] = useState({ hasNextPage: true, page: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: null, errorModalVisible: false });

  useEffect(() => { loadExercises() }, []);

  const loadExercises = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${urls.getExercises}?size=${pageSize}&page=${paginationInfo.page}`,
        {
          headers: {
            'Content-Type': 'application/json',
            token
          }
        },
      );

      if (!response.ok) throw Error(response.status);

      const data = await response.json();

      setPagenationInfo({
        hasNextPage: data.hasNextPage,
        page: (paginationInfo.page + 1)
      });

      return dispatch({ type: 'set_exercises', payload: data.exercises });
    } catch (error) {

      return setError({ error, errorModalVisible: true });
    } finally {
      return setLoading(false);
    }
  };
  
  return (
    <>
      <ErrorModal error={error} setError={setError} />
      <LoadingModal isVisible={loading} />
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
                dispatch={dispatch}
              />
            );
          }}
          onEndReached={() => {
            if (paginationInfo.hasNextPage) loadExercises();
          }}
          onEndReachedThreshold={0.4}
        />
      <AddExerciseButton
        setAddExerciseModalVisable={setAddExerciseModalVisable}
      />
    </View>
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