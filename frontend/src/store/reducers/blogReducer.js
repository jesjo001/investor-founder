import { GET_ALL_BLOGS, EXPORT_ALL_BLOGS, GET_SINGLE_BLOG } from '../actions/types';

const initialState = {
  blogs: [],
};

 const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };
      case GET_SINGLE_BLOG:
      return {
        ...state,
        singleBlog: action.payload,
      };
    default:
      return state;
  }
}

export default blogReducer;