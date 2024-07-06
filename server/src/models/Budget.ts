import mongoose from "mongoose";
import { BudgetPlanType } from "../types/BudgetPlanType";

const BudgetSchema = new mongoose.Schema<BudgetPlanType>({
  budget_owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  budget_value: {
    type: Number,
    required: [true, "Please provide budget value"],
  },
  item_list: [{ item_name: String, isBought: Boolean }],
  month: {
    type: Number,
    required: [true, "Please provide budget month"],
  },

  year: {
    type: Number,
    required: [true, "Please provide budget year"],
  },
});

const Budget = mongoose.model("Budget", BudgetSchema);

export default Budget;
