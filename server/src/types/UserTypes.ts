import { TransactionType } from "./TransactionType";

export interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  available_balance: number;
  saving_balance: number;
  loan_balance: number;
  transactions: TransactionType[];

  savings: [
    {
      saving_date: string;
      saving_value: number;
      source: string;
      status: "finished" | "canceled" | "processing";
    }
  ];

  budget_plan: [
    {
      month: string;
      year: number;
      item_list: [{ value: string; isBought: boolean }];
      budget: number;
    }
  ];

  wishlist: [
    {
      item: string;
      price: number;
      total_saved: number;
      priority: "low" | "medium" | "high";
    }
  ];

  loan: [
    {
      laon_reason: string;
      loan_value: number;
      loan_date: string;
      loan_resource: string;
    }
  ];
}
