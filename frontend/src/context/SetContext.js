import createDataContext from './createDataContext';
import client from '../api/client';
import urls from '../common/urls';

const setReducer = (state, action) => {
  switch (action.type) {
    case 'init_sets':
      return { error: null, sets: action.payload };
    case 'set_error':
      return { ...state, error: action.payload }
    default:
      return state;
  }
};

const initSetList = dispatch => async () => {
  try {
    const response = await client.get(urls.getExercises);
    const { data } = response;

    return dispatch({ type: 'init_exercises', payload: data });
  } catch (error) {
    console.log(error);
    return dispatch({ type: 'set_error', payload: error });
  }
};

export const { Context, Provider } = createDataContext(
  exerciseReducer,
  { initExerciseList, addExercise, editExercise, deleteExercise },
  { exerciseList: null, error: null }
);