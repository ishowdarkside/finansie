import mongoose from "mongoose";

export interface BudgetPlanType {
  budget_owner: mongoose.Types.ObjectId;
  month: number;
  year: number;
  item_list: { value: string; isBought: boolean }[];
  budget_value: number;
  id: string;
}
