import API from '../../assets/api';
import { GET_ALL_USERS } from './types';

// consoles will be removed, it is just to test the api
// request & response payloads to ensure the correct data
// is passed to the reducer where necessary

export const getAllUsers = (page, limit) => {
  return async dispatch => {
    const response = await API.getUsers(page, limit);
    const { data } = response;
    dispatch({
      type: GET_ALL_USERS,
      payload: data,
    });
  };
};

export const postNewUser = data => {
  return async dispatch => {
    const response = await API.postUser(data);
    const res = await response;
    console.log('RESPONSE: ', res);
  };
};

export const deleteUser = user_id => {
  return async dispatch => {
    const response = await API.deleteUser(user_id);
  };
};
