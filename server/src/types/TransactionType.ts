import mongoose from "mongoose";
import { UserInterface } from "./UserTypes";

export interface TransactionType {
  transaction_owner: UserInterface;
  transaction_date: Date;
  source: string;
  transaction_value: number;
  transaction_type: "income" | "charge";
  status: "finished" | "processing" | "canceled";
}
