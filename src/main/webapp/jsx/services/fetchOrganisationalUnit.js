import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const fetchOrganisationalUnit = async (id) => {
  const response = await axios.get(
    `${baseUrl}organisation-units/parent-organisation-units/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
