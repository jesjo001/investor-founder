import { useQuery } from "react-query";
import axios from "axios";
import { API_PATH } from "../utils/constants";

const getStartupCount = async () => {
  const result = await axios({
    method: "GET",
    url: `${API_PATH}/startUpCount`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return result.data;
};

const useStartupCountQuery = (queryName) => {
  const result = useQuery(queryName, getStartupCount);
  return result;
};

export default useStartupCountQuery;
