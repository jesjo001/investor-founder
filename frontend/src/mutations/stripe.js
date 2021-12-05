import axios from "axios";
import { API_PATH } from "../utils/constants";

const makePaymentMutation = async (data) => {
  const endpoint = "/stripe-payment";
  const result = await axios({
    method: "POST",
    url: `${API_PATH}${endpoint}`,
    data: {
      amount: data?.amount,
      id: data?.id,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return result.data;
};

export default makePaymentMutation;
