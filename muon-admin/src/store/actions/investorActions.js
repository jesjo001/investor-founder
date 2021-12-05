import API from './../../assets/api';
import { GET_ALL_INVESTORS, EXPORT_ALL_INVESTORS } from './types';

// consoles will be removed, it is just to test the api
// request & response payloads to ensure the correct data
// is passed to the reducer where necessary

// action names begin with the appropriate http verb for ease of understanding

export const getAllInvestors = (page, limit) => {
  return async dispatch => {
    const response = await API.getInvestors(page, limit);
    const { data } = response;
    dispatch({
      type: GET_ALL_INVESTORS,
      payload: data,
    });
  };
};

export const exportInvestors = (page, limit) => {
  return async dispatch => {
    const response = await API.exportInvestors(page, limit);
    const { data } = response;
    dispatch({
      type: EXPORT_ALL_INVESTORS,
      payload: data,
    });
  };
};

export const deleteInvestor = investor_id => {
  return async dispatch => {
    const response = await API.deleteInvestor(investor_id);
  };
};
