import axios from "axios";
import { toFormData } from "../utils/rest";
import { API_PATH } from "../utils/constants";

const founderQuestionnaireMutation = async (data) => {

  const formData = toFormData( data );

  const result = await axios({
    url: `${API_PATH}/signup`,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return result.data;
};

export default founderQuestionnaireMutation;
