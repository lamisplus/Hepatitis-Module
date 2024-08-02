import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const saveDiagnosis = async (data) => {
  const response = await axios.post(`${baseUrl}hepatitis/diagnosis`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
