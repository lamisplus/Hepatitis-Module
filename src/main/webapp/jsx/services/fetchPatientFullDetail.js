import { token, url as baseUrl } from "../../api";
import axios from "axios";

export const fetchFullPatientDetail = async (id) => {
  const response = await axios.get(`${baseUrl}patient/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response?.data;
};
