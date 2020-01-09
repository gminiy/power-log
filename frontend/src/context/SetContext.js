import createDataContext from './createDataContext';
import client from '../api/client';
import urls from '../common/urls';

const setReducer = (state, action) => {
  switch (action.type) {
    case 'delete_set':
    return {
      ...state,
      setList:
        state.setList.filter(
          (set) => set.id !== action.payload.id
        )
    }
    case 'update_set':
      return { ...state, setList: state.setList.map((set) => {
        return set.id === action.payload.id
          ? set = action.payload
          : set
      })};
    case 'init_sets':
      return { error: null, setList: action.payload };
    case 'set_error':
      return { ...state, error: action.payload };
    case 'add_set':
      return { ...state, setList: state.setList.concat(action.payload)};
    default:
      return state;
  }
};

const initSetList = dispatch => async (exerciseId) => {
  try {
    const rightNow = new Date();
    const date = rightNow.toISOString().slice(0,10);
    
    const response = await client.get(
      `${urls.getSets}?id=${exerciseId}&date=${date}`
    );

    return dispatch({ type: 'init_sets', payload: response.data });
  } catch (error) {
    console.log(error);
    return dispatch({ type: 'set_error', payload: error });
  }
};

const addSet = dispatch => async ({ weight, reps, exerciseId }) => {
  try {
    const response = await client.post(
      urls.addSet,
      { weight, reps, exerciseId },
    );
    
    return dispatch({ type: 'add_set', payload: response.data});
  } catch (error) {
    console.log(error);
    return dispatch({ type: 'set_error', payload: error });
  }
};

const updateSet = dispatch => async ({ id, weight, reps }) => {
  try {
    await client.put(
      `${urls.addSet}/${id}`,
      { weight, reps },
    );
    
    return dispatch({ type: 'update_set', payload: { id, weight, reps } });
  } catch (error) {
    console.log(error);
    return dispatch({ type: 'set_error', payload: error });
  }
};

const deleteSet = dispatch => async (id) => {
  try {
    await client.delete(`${urls.deleteSet}/${id}`);

    return dispatch({ type: 'delete_set', payload: { id } });
  } catch (error) {
    console.log(error);
    return dispatch({ type: 'set_error', payload: error });
  }
};

export const { Context, Provider } = createDataContext(
  setReducer,
  { initSetList, updateSet, addSet, deleteSet },
  { setList: [], error: null }
);