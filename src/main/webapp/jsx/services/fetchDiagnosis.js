import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const fetchDiagnosis= async (id) => {
  const response = await axios.get(
    `${baseUrl}hepatitis/view-hepatitis-diagnosis-by-id/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response?.data;
};