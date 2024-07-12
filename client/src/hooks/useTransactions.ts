import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTransaction, getMyTransactions } from "../services/transaction";
import { TransactionType } from "../types/TransactionType";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

export function useMyTransactions() {
  const { data, isPending, error } = useQuery({
    queryKey: ["transactions"],

    queryFn: getMyTransactions,
  });

  return { data, isPending, error };
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (transaction: TransactionType) =>
      createTransaction(transaction),

    onMutate: async (transaction: TransactionType) => {
      // Add temporary date  and id to transaction object
      transaction.transaction_date = new Date();
      transaction._id = uuidv4();

      // Cancel refetch so it desn't interrupt optimistic update
      await queryClient.cancelQueries({ queryKey: ["transactions"] });

      const previousTransactions = queryClient.getQueryData(["transactions"]);
      queryClient.setQueryData(["transactions"], (old: TransactionType[]) => [
        transaction,
        ...old,
      ]);

      return { previousTransactions };
    },

    onError: (err, newTransaction, context) => {
      queryClient.setQueryData(["transactions"], context?.previousTransactions);
    },

    onSettled: (res?: { status: string; message: string }) => {
      console.log(res);
      if (res && res.status === "success") toast.success(res.message);
      if (res && res.status === "fail") toast.error(res.message);
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
    },
  });

  return mutation;
}
