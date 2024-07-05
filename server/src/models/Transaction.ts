import mongoose from "mongoose";
import { TransactionType } from "../types/TransactionType";

const TransactionSchema = new mongoose.Schema<TransactionType>({
  transaction_owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  transaction_date: {
    type: String,
    required: [true, "Please provide transaction date"],
  },
  transaction_value: {
    type: Number,
    required: [true, "Please provide transaction value"],
  },
  transaction_type: {
    type: String,
    enum: ["charge", "income"],
    required: [true, "Please provide transaction type"],
  },
  status: {
    type: String,
    required: [true, "Please define transaction status!"],
    enum: ["completed", "processing", "canceled"],
  },
  source: {
    type: String,
    required: [true, "Please provide transaction source"],
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
