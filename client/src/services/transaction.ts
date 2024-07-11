import axios from "axios";
import { BASE_URL } from "../utils/url";
import { TransactionType } from "../types/TransactionType";

export async function getMyTransactions() {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${BASE_URL}/api/transactions/myTransactions`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.data.transactions)
    return response.data.transactions as TransactionType[];
}
