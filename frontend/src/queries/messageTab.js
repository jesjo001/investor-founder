import { useQuery } from 'react-query';
import axios from 'axios';
import { API_PATH } from '../utils/constants';

export const getConversations = async () => {
  const result = await axios({
    method: 'GET',
    url: `${API_PATH}/conversation`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return result.data;
};

export const getMyConversations = async () => {
  const result = await axios({
    method: 'GET',
    url: `${API_PATH}/conversation/me`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return result.data;
};

export const getConversation = async (conversationId) => {
  const result = await axios({
    method: 'GET',
    url: `${API_PATH}/conversation/${conversationId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return result.data;
};

export const getMessages = async (conversationId) => {
  const result = await axios({
    method: 'GET',
    url: `${API_PATH}/messaging/${conversationId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return result?.data;
};

export const removeParticipant = async (conversationId, participantId) => {
  const result = await axios({
    method: 'DELETE',
    url: `${API_PATH}/conversation/${conversationId}/${participantId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return result.data;
};

export const getAllParticipants = async () => {
  const result = await axios({
    method: 'GET',
    url: `${API_PATH}/conversation/all-participants`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return result?.data;
};

export const deleteConversation = async (conversationId) => {
  const result = await axios({
    method: 'DELETE',
    url: `${API_PATH}/conversation/${conversationId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return result?.data;
};

const useMessagesQuery = (queryName) => {
  const result = useQuery(queryName, getConversations);
  return result;
};

export default useMessagesQuery;
