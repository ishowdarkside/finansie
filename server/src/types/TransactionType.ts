import mongoose from "mongoose";

export interface TransactionType {
  transaction_owner: UserInterface;
  transaction_date: string;
  source: string;
  transaction_value: number;
  transaction_type: "income" | "charge";
  status: "finished" | "processing" | "canceled";
}
