import API from '../../api';
import { GET_ALL_BLOGS, GET_SINGLE_BLOG } from './types';

export const getAllBlogs = (page, limit) => {
  return async dispatch => {
    const response = await API.getBlogs(page, limit);
    const { data } = response;
    dispatch({
      type: GET_ALL_BLOGS,
      payload: data,
    });
  };
};

export const getBlogById = (id) => {
  return async dispatch => {
    const response = await API.getBlogById(id);
    const { data } = response;
    dispatch({
      type: GET_SINGLE_BLOG,
      payload: data,
    });
  };
};



export const postNewBlog = data => {
  return async dispatch => {
    const response = await API.postBlog(data);
    const res = await response;
    console.log('RESPONSE: ', res);
  };
};
