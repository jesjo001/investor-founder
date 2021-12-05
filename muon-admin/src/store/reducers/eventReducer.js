import { GET_ALL_EVENTS, EXPORT_ALL_EVENTS } from '../actions/types';

const initialState = {
  events: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
      case EXPORT_ALL_EVENTS:
      return {
        ...state,
        eventsExport: action.payload,
      };
    default:
      return state;
  }
}
