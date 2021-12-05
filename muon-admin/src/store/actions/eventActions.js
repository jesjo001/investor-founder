import API from './../../assets/api';
import { GET_ALL_EVENTS, EXPORT_ALL_EVENTS } from './types';

// consoles will be removed, it is just to test the api
// request & response payloads to ensure the correct data
// is passed to the reducer where necessary

export const getAllEvents = (page, limit) => {
  return async dispatch => {
    const response = await API.getEvents(page, limit);
    const { data } = response;
    dispatch({
      type: GET_ALL_EVENTS,
      payload: data,
    });
  };
};

export const exportEvents = () => {
  return async dispatch => {
    const response = await API.exportEvents();
    const { data } = response;
    dispatch({
      type: EXPORT_ALL_EVENTS,
      payload: data,
    });
  };
};

export const postNewEvent = data => {
  return async dispatch => {
    const response = await API.postEvent(data);
    const res = await response;
    console.log('RESPONSE: ', res);
  };
};

export const deleteEvent = event_id => {
  return async dispatch => {
    const response = await API.deleteEvent(event_id);
  };
};
