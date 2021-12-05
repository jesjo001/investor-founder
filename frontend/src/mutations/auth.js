import axios from 'axios';
import { API_PATH } from '../utils/constants';

export const resetPassword = async (data) => {
  try {
    const result = await axios({
      url: `${API_PATH}/reset-password`,
      method: 'POST',
      data,
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem('token')}`,
      // },
    });

    return result.data;
  } catch (error) {
    return error;
  }
};

export const forgotPassword = async (data) => {
  try {
    // data = {email: }
    const result = await axios({
      url: `${API_PATH}/forgot-password`,
      method: 'POST',
      data,
    });

    return result.data;
  } catch (error) {
    return error;
  }
};

export const deleteAccount = async (id) => {
  try {
    const result = await axios({
      url: `${API_PATH}/delete/${id}`,
      method: 'delete',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return result.data;
  } catch (error) {
    return error;
  }
};
