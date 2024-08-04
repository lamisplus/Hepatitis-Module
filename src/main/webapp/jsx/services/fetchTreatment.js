import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const fetchTreatment = async (id) => {
  const response = await axios.get(
    `${baseUrl}hepatitis/view-hepatitis-treatment-by-id/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response?.data;
};