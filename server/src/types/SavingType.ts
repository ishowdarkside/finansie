import mongoose from "mongoose";

export interface SavingType {
  saving_date: Date;
  saving_value: Number;
  saving_owner: mongoose.Types.ObjectId;
  source: String;
  status: "Completed" | "Processing" | "Canceled";
}
