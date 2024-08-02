import { useQuery } from "react-query";
import { fetchOrganisationalUnit } from "../services/fetchOrganisationalUnit";
import { useState } from "react";

export const useFetchOranisationalUnit = (id) => {
  const [returnData, setReturnData] = useState([]);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => fetchOrganisationalUnit(id),
    queryKey: ["FETCH_ORGANISATIONAL_UNIT", id],
    enabled: id !== null,
    onSuccess: (data) => {
      setReturnData(data);
    },
  });

  return {
    data,
    returnData,
    isLoading,
    isError,
    setReturnData,
  };
};
