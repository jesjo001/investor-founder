import axios from 'axios';
const LocalURL = `${process.env.REACT_APP_API_PATH_LOCAL}`;
const LiveURL = '';
/* eslint-disable import/no-anonymous-default-export */
export default {
  url: LocalURL,
  headers(fileupload = false) {
    const token = localStorage.getItem('token');

    let header = {};
    if (fileupload) {
      header['Content-type'] = 'multipart/form-data';
    } else {
      header['Content-type'] = 'application/json';
      header['Accept'] = '*/*';
      header['Access-Control-Allow-Origin'] = '*';
    }
    if (token && token !== undefined) {
      header['Authorization'] = `Bearer ${token}`;
    }
    return header;
  },

  getBlogs(page, limit) {
    console.log(`${this.url}/blogs/get-blogs?page=${page}&limit=${limit}`)
    return axios({
      method: 'get',
      url: `${this.url}/blogs/get-blogs?page=${page}&limit=${limit}`,
      headers: this.headers(),
    });
  },

  getBlogById(id) {
    return axios({
      method: 'get',
      url: `${this.url}/blogs/get-blogs/${id}`,
      headers: this.headers(),
    });
  },

  postBlog(data) {
    return axios({
      method: 'post',
      url: `${this.url}blog/create`,
      headers: this.headers(),
      data,
    });
  },
};
