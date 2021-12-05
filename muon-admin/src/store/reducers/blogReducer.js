import { GET_ALL_BLOGS, EXPORT_ALL_BLOGS } from '../actions/types';

const initialState = {
  blogs: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };
      case EXPORT_ALL_BLOGS:
      return {
        ...state,
        blogsExport: action.payload,
      };
    default:
      return state;
  }
}
