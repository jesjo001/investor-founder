import axios from 'axios';
import { toFormData } from '../utils/rest';
import { API_PATH } from '../utils/constants';

const becomeMemberMutation = async (data) => {
  try {
    const formData = toFormData(data);

    const result = await axios({
      url: `${API_PATH}/investor/signup`,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return result.data;
  } catch (error) {
    return error.message
  }
};

export default becomeMemberMutation;
