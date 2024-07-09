import { TransactionType } from "./TransactionType";

export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string | undefined;
  available_balance: number;
  saving_balance: number;
  loan_balance: number;
  transactions: TransactionType[];

  savings: [
    {
      saving_date: Date;
      saving_value: number;
      source: string;
      status: "finished" | "canceled" | "processing";
    }
  ];

  budget_plan: string[];

  wishlist: [
    {
      _id?: string;
      wishlist_item: string;
      price: number;
      total_saved: number;
      priority: "low" | "medium" | "high";
    }
  ];

  loan: [
    {
      loan_reason: string;
      loan_value: number;
      loan_date: Date;
      _id?: string;
      loan_resource: string;
      loan_saved_amount: number;
    }
  ];
}
