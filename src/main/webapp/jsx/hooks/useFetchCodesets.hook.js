import { useQuery } from "react-query";
import { fetchCodesets } from "../services/fetchCodesets";
import { useState } from "react";

export const useFetchCodesets = (codesetPath) => {
  const [returnData, setReturnData] = useState([]);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => fetchCodesets(codesetPath),
    queryKey: ["FETCH_CODESET", codesetPath],
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
