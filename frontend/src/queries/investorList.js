import { useQuery } from "react-query";
import axios from "axios";
import { API_PATH } from "../utils/constants";

const getInvestorsList = async () => {
  const result = await axios({
    method: "GET",
    url: `${API_PATH}/investor/getInvestors`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  
  return result.data;
};

const useInvestorsListQuery = (queryName) => {
  const result = useQuery(queryName, getInvestorsList);
  return result;
};

export default useInvestorsListQuery;
