import { API_PATH } from "../utils/constants"
import axios from "axios";
import { useQuery } from 'react-query';

 export const MyConnectionAsSender = async()=>{
    const result = await axios({
        method: 'GET',
        url: `${API_PATH}/myConnectionSender`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      return result.data;
}
const useConnectionQuery = (queryName) => {
  const result = useQuery(queryName, MyConnectionAsSender);

  return result;
};

export default useConnectionQuery;