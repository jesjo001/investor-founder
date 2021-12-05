import axios from "axios";
import { API_PATH } from "../utils/constants";
import { toFormData } from "../utils/rest";

const updateInfoMutation = async (data) => {
  console.log(data);
  if (typeof data.profileImage === "object") {
    const formData = toFormData(data);
    const result = await axios({
      method: "POST",
      url: `${API_PATH}/founder/updateprofile`,
      data: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return result.data;
  } else {
    const result = await axios({
      method: "POST",
      url: `${API_PATH}/founder/updateprofile`,
      data: {
        ...data,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return result.data;
  }
};

export default updateInfoMutation;
