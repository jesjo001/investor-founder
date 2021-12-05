import API from './../../assets/api';
import { returnErrors } from './errorActions';

import { INPUT_CHANGE, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, AUTH_FAILURE, AUTH_SUCCESS } from './types';

export const inputChange = (name, value) => async dispatch => {
  try {
    dispatch({
      type: INPUT_CHANGE,
      payload: {
        name: name,
        value: value,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = user => async dispatch => {
  try {
    dispatch({
      type: INPUT_CHANGE,
      payload: {
        name: 'loading',
        value: true,
      },
    });
    const result = await API.login(user);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: result.data.data,
    });

    dispatch({
      type: INPUT_CHANGE,
      payload: {
        name: 'loading',
        value: false,
      },
    });
  } catch (err) {
    dispatch({
      type: INPUT_CHANGE,
      payload: {
        name: 'loading',
        value: false,
      },
    });
    dispatch(
      returnErrors(
        err.response.data.errors ? err.response.data.errors : err.response.data.error,
        err.response.data.status,
        'LOGIN_FAILURE'
      )
    );
    dispatch({
      type: LOGIN_FAILURE,
    });
  }
};

export const loadUser = () => async dispatch => {
  try {
    dispatch({
      type: INPUT_CHANGE,
      payload: {
        name: 'loading',
        value: true,
      },
    });
    const result = await API.loadUser();
    dispatch({
      type: AUTH_SUCCESS,
      payload: result.data.data,
    });

    dispatch({
      type: INPUT_CHANGE,
      payload: {
        name: 'loading',
        value: false,
      },
    });
  } catch (err) {
    dispatch({
      type: INPUT_CHANGE,
      payload: {
        name: 'loading',
        value: false,
      },
    });
    dispatch(
      returnErrors(
        err.response.data.errors ? err.response.data.errors : err.response.data.error,
        err.response.data.status,
        'AUTH_FAILURE'
      )
    );
    dispatch({
      type: AUTH_FAILURE,
    });
  }
};

export const logOut = () => async dispatch => {
  try {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    console.error(error);
  }
};
