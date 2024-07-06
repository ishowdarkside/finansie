import mongoose from "mongoose";

export interface BudgetPlanType {
  budget_owner: mongoose.Types.ObjectId;
  month: number;
  year: number;
  item_list: { item_name: string; isBought: boolean }[];
  budget_value: number;
  id: mongoose.Types.ObjectId;
}
