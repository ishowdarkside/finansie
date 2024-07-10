import { useQuery } from "@tanstack/react-query";
import { getCurrentMonthPlan } from "../services/budget";

export function useLatestBudget() {
  const { data, isPending, error } = useQuery({
    queryKey: ["latestBudget"],
    queryFn: getCurrentMonthPlan,
  });

  return { data, isPending, error };
}
