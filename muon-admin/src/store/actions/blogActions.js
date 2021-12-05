import API from '../../assets/api';
import { GET_ALL_BLOGS, EXPORT_ALL_BLOGS } from './types';

// consoles will be removed, it is just to test the api
// request & response payloads to ensure the correct data
// is passed to the reducer where necessary

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

export const getUnapprovedBlogs = (page, limit) => {
  return async dispatch => {
    const response = await API.getUnapprovedBlogs(page, limit);
    const { data } = response;
    dispatch({
      type: GET_ALL_BLOGS,
      payload: data,
    });
  };
};

export const exportBlogs = () => {
  return async dispatch => {
    const response = await API.exportBlogs();
    const { data } = response;
    dispatch({
      type: EXPORT_ALL_BLOGS,
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

export const postApproveBlog = blog_id => {
  return async dispatch => {
    const response = await API.postApproveBlog(blog_id);
    const res = await response;
    console.log('RESPONSE: ', res);
  };
};

export const deleteBlog = blog_id => {
  return async dispatch => {
    const response = await API.deleteBlog(blog_id);
  };
};
