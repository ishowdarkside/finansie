import { useQuery } from "@tanstack/react-query";
import { getMySavings } from "../services/savings";

export function useGetSavings() {
  const { data, isPending, error } = useQuery({
    queryKey: ["savings"],
    queryFn: getMySavings,
  });

  return { data, isPending, error };
}
