import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTransaction,
  deleteTransaction,
  getMyTransactions,
  updateTransaction,
} from "../services/transaction";
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

    onError: (err: Error, newTransaction, context) => {
      toast.error(err.message);
      queryClient.setQueryData(["transactions"], context?.previousTransactions);
    },

    onSettled: (res?: { status: string; message: string }) => {
      if (res && res.status === "fail") return toast.error(res.message);
      if (res && res.status === "success") toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
    },
  });

  return mutation;
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["transactions"] });

      const previousData = queryClient.getQueryData(["transactions"]);
      queryClient.setQueryData(["transactions"], (old: TransactionType[]) =>
        old.filter((e) => e._id !== id)
      );

      return { previousData };
    },
    onError: (err, _, context) => {
      toast.error(err.message);
      queryClient.setQueryData(["transactions"], context?.previousData);
    },

    onSuccess: () => {
      toast.success("Transaction deleted");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  return { mutate, isPending };
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      transactionId,
      formData,
    }: {
      transactionId: string;
      formData: TransactionType;
    }) => updateTransaction(transactionId, formData),

    onError: (res) => {
      toast.error(res.message);
    },
    onSuccess: (res) => {
      if (res.status === "fail") return toast.error(res.message);
      if (res.status === "success") toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  return { mutate, isPending };
}
