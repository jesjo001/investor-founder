import { GET_FOUNDERS, GET_UNAPPROVED_FOUNDERS, APPROVE_FOUNDER, EXPORT_ALL_FOUNDERS } from '../actions/types';

const initialState = {
  founders: [],
  unapproved: [],
  approve: [],
};

const founderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FOUNDERS:
      return {
        ...state,
        founders: payload,
      };
    case GET_UNAPPROVED_FOUNDERS:
      return {
        ...state,
        unapproved: payload,
      };
    case APPROVE_FOUNDER:
      return {
        ...state,
        approve: payload,
      };
    case EXPORT_ALL_FOUNDERS:
      return {
        ...state,
        foundersExport: payload,
      };
    default:
      return state;
  }
};

export default founderReducer;
