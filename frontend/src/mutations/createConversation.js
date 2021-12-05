import axios from 'axios';
import { API_PATH } from '../utils/constants';

const createConversationMutation = async (data) => {
  try {
    const result = data.email
      ? await axios({
          method: 'POST',
          url: `${API_PATH}/conversation/create/${data.email}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
      : await axios({
          method: 'POST',
          url: `${API_PATH}/conversation/group-chat`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          data: {
            participants: data.ids
          }
        });
    console.log(result?.status);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default createConversationMutation;
