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

export async function createTransaction(transaction: TransactionType) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${BASE_URL}/api/transactions`,
      transaction,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data.message);
    }
  }
}

export async function deleteTransaction(transactionId: string) {
  const token = localStorage.getItem("token");

  try {
    await axios.delete(`${BASE_URL}/api/transactions/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    if (axios.isAxiosError(err)) throw new Error(err.response?.data.message);
  }
}

export async function updateTransaction(
  transactionId: string,
  formData: TransactionType
) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/transactions/${transactionId}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) throw new Error(err.message);
  }
}
