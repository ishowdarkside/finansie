import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createWishlistItem, deleteWishlistItem, topupWishlistItem, updateWishlistItem } from "../services/wishlist";
import { WishlistItemTypes } from "../types/WishlistItemType";
import { useUser } from "./useAuth";
import axios from "axios";
import { BASE_URL } from "../utils/url";

export function useGetMyWishlist() {
  const { data: user } = useUser();

  const { data } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => user.wishlist,
  });

  return { data };
}

export function useCreateWishlist() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: WishlistItemTypes) => createWishlistItem(formData),
    onError: (err, _, context) => {
      toast.error(err.message);
    },
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { mutate, isPending };
}

export function useUpdateWishlist() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: WishlistItemTypes }) => updateWishlistItem(id, formData),
    onError: (err) => toast.error(err.message),
    onSuccess: async (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { mutate, isPending };
}

export function useTopupWishlistItem() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ saved_balance, id }: { saved_balance: number; id: string }) => {
      return await topupWishlistItem(id, saved_balance);
    },

    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { mutate, isPending };
}

export default function useDeleteWishlistItem() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (itemId: string) => deleteWishlistItem(itemId),
    onSuccess: () => {
      toast.success("Item deleted.");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isPending };
}
