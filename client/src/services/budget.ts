import axios from "axios";
import { BASE_URL } from "../utils/url";
import { BudgetPlanType } from "../types/BudgetPlanType";

export async function getCurrentMonthPlan() {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get<{
      status: string;
      latest_budget: BudgetPlanType | "not-found";
    }>(`${BASE_URL}/api/budget/latestBudget`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.latest_budget;
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response;
    console.log(err);
  }
}
