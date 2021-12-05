import { useQuery } from "react-query";
import axios from "axios";
import { API_PATH } from "../utils/constants";

const userInfo = async () => {
  const result = await axios({
    method: "GET",
    url: `${API_PATH}/info`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  
  return result.data;
};

const useUserInfoQuery = (queryName) => {
  const result = useQuery(queryName, userInfo);
  return result;
};

export default useUserInfoQuery;
