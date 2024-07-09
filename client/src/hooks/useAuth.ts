import { useQuery } from "@tanstack/react-query";
import { getCurrentlyLoggedInUser } from "../services/auth";
import { UserInterface } from "../types/UserTypes";

export function useUser() {
  const token = localStorage.getItem("token");

  const { data, isPending, error } = useQuery({
    queryKey: ["user"],
    gcTime: 0,
    queryFn: () => getCurrentlyLoggedInUser(token!),
  });

  return { data, isPending, error };
}
