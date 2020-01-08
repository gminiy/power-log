import createDataContext from './createDataContext';
import client from '../api/client';
import urls from '../common/urls';

const exerciseReducer = (state, action) => {
  switch (action.type) {
    case 'delete_exercise':
      return {
        ...state,
        exerciseList:
          state.exerciseList.filter(
            (exercise) => exercise.id !== action.payload.id
          )
      }
    case 'edit_exercise':
      const { id, newName } = action.payload;
      return { 
        ...state,
        exerciseList:
          state.exerciseList.map((exercise) => {
            if (exercise.id === id) return {...exercise, name: newName}

            return exercise
          })
      };
    case 'add_exercise':
      return { ...state, exerciseList: state.exerciseList.concat(action.payload)}
    case 'init_exercises':
      return { error: null, exerciseList: action.payload };
    case 'set_error':
      return { ...state, error: action.payload }
    default:
      return state;
  }
};

const initExerciseList = dispatch => async () => {
  try {
    const response = await client.get(urls.getExercises);
    const { data } = response;

    return dispatch({ type: 'init_exercises', payload: data });
  } catch (error) {
    console.log(error);
    return dispatch({ type: 'set_error', payload: error });
  }
};

const addExercise = dispatch => async (name) => {
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
}

const editExercise = dispatch => async ({ id, newName }) => {
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
}

const deleteExercise = dispatch => async (id) => {
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
}

export const { Context, Provider } = createDataContext(
  exerciseReducer,
  { initExerciseList, addExercise, editExercise, deleteExercise },
  { exerciseList: [], error: null }
);