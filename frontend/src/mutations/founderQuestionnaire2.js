import axios from "axios";
import { toFormData } from "../utils/rest";
import { API_PATH } from "../utils/constants";

const founderQuestionnaireMutation2 = async (data) => {
  const formData = toFormData(data);

  const result = await axios({
    url: `${API_PATH}/founder/pending-signup`,
    method: "POST",
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return result.data;
};

export default founderQuestionnaireMutation2;
