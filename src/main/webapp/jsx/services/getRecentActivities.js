import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const getRecentActivties = async (id) => {
    const response =  await axios
      .get(`${baseUrl}hepatitis/activities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      return response?.data
      
  };