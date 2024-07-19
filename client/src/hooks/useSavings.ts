import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSaving, getMySavings } from "../services/savings";
import { SavingType } from "../types/SavingsType";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export function useGetSavings() {
  const { data, isPending, error } = useQuery({
    queryKey: ["savings"],
    queryFn: getMySavings,
  });

  return { data, isPending, error };
}

export function useCreateSaving() {
  const queryClient = useQueryClient();

  const { mutate, error, isPending } = useMutation({
    mutationFn: (saving: SavingType) => createSaving(saving),
    onMutate: async (saving: SavingType) => {
      saving.saving_value = +saving.saving_value;
      await queryClient.cancelQueries({ queryKey: ["transactions"] });

      saving._id = uuidv4();
      saving.saving_date = new Date();
      const previousSavings: SavingType[] = queryClient.getQueryData([
        "savings",
      ])!;

      queryClient.setQueryData(["savings"], (old: SavingType[]) => [
        saving,
        ...old,
      ]);

      return { previousSavings };
    },

    onError: (err, variables, context) => {
      toast.error(err.message);
      console.log(variables);
      queryClient.setQueryData(["savings"], context?.previousSavings);
    },

    onSuccess: (res) => {
      if (res.status === "fail") return toast.error(res.message);
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["savings"] });
    },
  });

  return { mutate, error, isPending };
}
