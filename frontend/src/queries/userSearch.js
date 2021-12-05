import { useQuery } from "react-query";
import axios from "axios";
import { API_PATH } from "../utils/constants";

const userSearch = async ({queryKey}) => {
  const [,name] = queryKey;
  const result = await axios({
    method: "GET",
    url: `${API_PATH}/getUsers?name=${name}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return result.data;
};

const useUserSearchQuery = (queryName) => {
  const result = useQuery(queryName, userSearch);
  return result;
};

export default useUserSearchQuery;
