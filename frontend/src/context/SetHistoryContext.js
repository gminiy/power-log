import createDataContext from './createDataContext';
import client from '../api/client';
import urls from '../common/urls';

const SetHistoryReducer = (state, action) => {
  switch (action.type) {
    case 'set_set_list_by_date':
      return { 
        error: null,
        setListByDate: state.setListByDate.concat(action.payload)
      };
    case 'set_error':
      return { ...state, error: action.payload }
    default:
      return state;
  }
};

const setSetListByDate = dispatch => async ({ size, page, exerciseId }) => {
  try {
    const response = await client.get(
      `${urls.getSetList}?size=${size}&&page=${page}&&exerciseId=${exerciseId}`
    );

    return dispatch({ type: 'set_set_list_by_date', payload: response.data });
  } catch (error) {
    console.log(error);
    return dispatch({ type: 'set_error', payload: error });
  }
};

export const { Context, Provider } = createDataContext(
  SetHistoryReducer,
  { setSetListByDate },
  { setListByDate: [], newestSet: null }
);