import { GET_DASHBOARD_STATS } from '../actions/types';

const initialState = {
  dashboardStats: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD_STATS:
      return {
        ...state,
        dashboardStats: action.payload,
      };
    default:
      return state;
  }
}
