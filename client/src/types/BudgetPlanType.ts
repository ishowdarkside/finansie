export interface BudgetPlanType {
  budget_owner: string;
  month: number;
  year: number;
  item_list: { item_name: string; isBought: boolean; _id: string }[];
  budget_value: number;
  id: string;
}
