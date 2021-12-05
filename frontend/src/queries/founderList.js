import { useQuery } from 'react-query';
import axios from 'axios';
import { API_PATH } from '../utils/constants';

const getFoundersList = async () => {
  const result = await axios({
    method: 'GET',
    url: `${API_PATH}/Founders`,
  });
  return result.data;
};

export const getFounderPlan = async () => {
  const result = await axios({
    method: 'GET',
    url: `${API_PATH}/plan-status`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  console.log(result);
  return result;
};

const useFoundersListQuery = (queryName) => {
  const result = useQuery(queryName, getFoundersList);

  return result;
};

export default useFoundersListQuery;
