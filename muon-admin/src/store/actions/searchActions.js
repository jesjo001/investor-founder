import API from '../../assets/api';
import { GET_SEARCH_RESULTS } from './types';

// consoles will be removed, it is just to test the api
// request & response payloads to ensure the correct data
// is passed to the reducer where necessary

// action names begin with the appropriate http verb for ease of understanding

export const getSearchResult = (model, search, page, limit) => {
  return async dispatch => {
    const response = await API.search(model, search, page, limit);
    const { data } = response;
    dispatch({
      type: GET_SEARCH_RESULTS,
      payload: data,
    });
  };
};
