import axios from "axios";
import { API_PATH } from "../utils/constants";

const referMemberMutation = async (data) => {
  const endpoint = "/investor/refer";
  const result = await axios({
    method: "POST",
    url: `${API_PATH}${endpoint}`,
    data: {
      name: data?.fullName,
      email: data?.email,
      type: data?.type,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return result.data;
};

export default referMemberMutation;
