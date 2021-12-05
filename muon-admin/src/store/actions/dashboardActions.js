import API from '../../assets/api';
import { GET_DASHBOARD_STATS } from './types';

// consoles will be removed, it is just to test the api
// request & response payloads to ensure the correct data
// is passed to the reducer where necessary

// action names begin with the appropriate http verb for ease of understanding

export const getDashboardStats = () => {
  return async dispatch => {
    const response = await API.getDashboardStats();
    const { data } = response;
    dispatch({
      type: GET_DASHBOARD_STATS,
      payload: data,
    });
  };
};
