import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const saveTreatment = async (data) => {
  const response = await axios.post(`${baseUrl}hepatitis/treatment`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
