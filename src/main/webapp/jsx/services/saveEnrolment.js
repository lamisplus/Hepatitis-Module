import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const saveEnrolment = async (data) => {
  const response = await axios.post(`${baseUrl}hepatitis/enrollment`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
