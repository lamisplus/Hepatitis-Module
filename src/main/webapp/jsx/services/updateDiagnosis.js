import axios from "axios";
import { token, url as baseUrl } from "../../api";

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const updateDiagnosis = async (args) => {
  const response = await axios.put(
    `${baseUrl}hepatitis/update-hepatitis-diagnosis/${args?.id}`,
    {
      ...args.data,
    },
    config
  );

  return response.data;
};
