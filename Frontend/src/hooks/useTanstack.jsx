import { useQuery } from "@tanstack/react-query";
import SchoolServices from "../services/SchoolsServices.js";

const useSchools = () => {
  const { isLoading, isFetching, data: schools, error, refetch, isFetched } = useQuery({
    queryKey: ["schoolsCenters"],
    queryFn: SchoolServices.getSchools,
    staleTime: 1000 * 60 * 5,
  });

  return { isLoading, isFetching, schools, error, refetch, isFetched };
}
const useAccounting = () => {
  const { isLoading, isFetching, data: acounting, error, refetch, isFetched } = useQuery({
    queryKey: ["accountingPlan"],
    queryFn: SchoolServices.getAccounting,
    staleTime: 1000 * 60 * 5,
  });

  return { isLoading, isFetching, acounting, error, refetch, isFetched };
}

export { useSchools, useAccounting };
