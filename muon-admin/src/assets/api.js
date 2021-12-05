import axios from 'axios';
const LocalURL = `${process.env.REACT_APP_API_ENDPOINT}`;
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

  login(data) {
    return axios({
      method: 'post',
      url: `${this.url}auth/login`,
      headers: this.headers(),
      data,
    });
  },
  loadUser() {
    return axios({
      method: 'get',
      url: `${this.url}auth/load-user`,
      headers: this.headers(),
    });
  },
  getInvestors(page, limit) {
    return axios({
      method: 'get',
      url: `${this.url}investors?page=${page}&limit=${limit}`,
      headers: this.headers(),
    });
  },
  exportInvestors() {
    return axios({
      method: 'get',
      url: `${this.url}exports/investors`,
      headers: this.headers(),
    });
  },
  deleteInvestor(id) {
    return axios({
      method: 'delete',
      url: `${this.url}investors/${id}`,
      headers: this.headers(),
    });
  },
  getEvents(page, limit) {
    return axios({
      method: 'get',
      url: `${this.url}events?page=${page}&limit=${limit}`,
      headers: this.headers(),
    });
  },
  exportEvents() {
    return axios({
      method: 'get',
      url: `${this.url}exports/events`,
      headers: this.headers(),
    });
  },
  postEvent(data) {
    return axios({
      method: 'post',
      url: `${this.url}events`,
      headers: this.headers(true),
      data,
    });
  },
  deleteEvent(id) {
    return axios({
      method: 'delete',
      url: `${this.url}events/${id}`,
      headers: this.headers(),
    });
  },
  getUsers(page, limit) {
    return axios({
      method: 'get',
      url: `${this.url}users?page=${page}&limit=${limit}`,
      headers: this.headers(),
    });
  },
  postUser(data) {
    return axios({
      method: 'post',
      url: `${this.url}auth/signup`,
      headers: this.headers(),
      data,
    });
  },
  getFounder(page, limit) {
    return axios({
      method: 'get',
      url: `${this.url}founders/getfounders?page=${page}&limit=${limit}`,
      headers: this.headers(),
    });
  },
  exportFounders() {
    return axios({
      method: 'get',
      url: `${this.url}exports/founders`,
      headers: this.headers(),
    });
  },
  getUnapprovedFounder(page, limit) {
    return axios({
      method: 'get',
      url: `${this.url}founders/unapproved?page=${page}&limit=${limit}`,
      headers: this.headers(),
    });
  },
  approveFounder(id) {
    return axios({
      method: 'post',
      url: `${this.url}founders/approve/${id}`,
      headers: this.headers(),
    });
  },
  deleteFounder(id) {
    return axios({
      method: 'delete',
      url: `${this.url}founders/delete/${id}`,
      headers: this.headers(),
    });
  },
  denyPendingFounder(id) {
    return axios({
      method: 'delete',
      url: `${this.url}founders/denypending/${id}`,
      headers: this.headers(),
    });
  },
  deleteUser(id) {
    return axios({
      method: 'delete',
      url: `${this.url}users/${id}`,
      headers: this.headers(),
    });
  },
  getDashboardStats() {
    return axios({
      method: 'get',
      url: `${this.url}dashboard/statistics`,
      headers: this.headers(),
    });
  },
  getBlogs(page, limit) {
    return axios({
      method: 'get',
      url: `${this.url}blog/getblogs?page=${page}&limit=${limit}`,
      headers: this.headers(),
    });
  },
  exportBlogs() {
    return axios({
      method: 'get',
      url: `${this.url}exports/blogs`,
      headers: this.headers(),
    });
  },
  getUnapprovedBlogs(page, limit) {
    return axios({
      method: 'get',
      url: `${this.url}blog/getUnapprovedBlogs?page=${page}&limit=${limit}`,
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
  postApproveBlog(id) {
    return axios({
      method: 'post',
      url: `${this.url}blog/approve/${id}`,
      headers: this.headers(),
    });
  },
  deleteBlog(id) {
    return axios({
      method: 'delete',
      url: `${this.url}blog/delete/${id}`,
      headers: this.headers(),
    });
  },
  search(model, search, page, limit) {
    return axios({
      method: 'get',
      url: `${this.url}search?searchWord=${search}&entity=${model}&page=${page}&limit=${limit}`,
      headers: this.headers(),
    });
  },
};
