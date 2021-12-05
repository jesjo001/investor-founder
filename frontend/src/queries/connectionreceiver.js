import { API_PATH } from "../utils/constants"
import axios from "axios";
import { useQuery } from 'react-query';

 export const MyConnectionAsReceiver = async()=>{
    const result = await axios({
        method: 'GET',
        url: `${API_PATH}/myConnections`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      return result.data;
}
const useConnectionQuery = (queryName) => {
  const result = useQuery(queryName, MyConnectionAsReceiver);

  return result;
};

export default useConnectionQuery;