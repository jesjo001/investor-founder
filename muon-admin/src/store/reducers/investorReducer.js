import { GET_ALL_INVESTORS, EXPORT_ALL_INVESTORS } from '../actions/types';

const initialState = {
  investors: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_INVESTORS:
      return {
        ...state,
        investors: action.payload,
      };
    case EXPORT_ALL_INVESTORS:
      return {
        ...state,
        investorsExport: action.payload,
      };
    default:
      return state;
  }
}
