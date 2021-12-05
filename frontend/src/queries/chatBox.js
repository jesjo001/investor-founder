import { useQuery } from 'react-query';
import axios from 'axios';
import { API_PATH } from '../utils/constants';

const getChat = async ({ queryKey }) => {
  const [, id] = queryKey;
  const result = await axios({
    method: 'GET',
    url: `${API_PATH}/messaging/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return result.data;
};
export const getChatParticipants = async (conversationId) => {
  const result = await axios({
    method: 'GET',
    url: `${API_PATH}/conversation/${conversationId}/participants`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return result.data;
};

const useChatQuery = (queryName) => {
  const result = useQuery(queryName, getChat);
  return result;
};

export default useChatQuery;
