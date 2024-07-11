import { useQuery } from "@tanstack/react-query";
import { getMyTransactions } from "../services/transaction";

export function useMyTransactions() {
  const { data, isPending, error } = useQuery({
    queryKey: ["transactions"],

    queryFn: getMyTransactions,
  });

  return { data, isPending, error };
}
