import axios from "axios";
import { API_PATH } from "../utils/constants";

const chatBoxMutation = async (data) => {
  const result = await axios({
    url: `${API_PATH}/messaging/${data.id}`,
    method: "POST",
    data: {
      sender: localStorage.getItem("id"),
      text: data.text,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return result.data;
};

export default chatBoxMutation;
