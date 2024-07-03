enum transactionStatus {
  "hold",
  "in progress",
  "finished",
}

interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  available_balance: number;
  saving_balance: string;
  loan_balance: number;
  transactions: [
    {
      transaction_date: string;
      source: string;
      transaction_value: number;
      status: "finished" | "processing" | "canceled";
    }
  ];

  savings: [
    {
      transaction_date: string;
      transaction_value: number;
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
      reasong: string;
      loan_value: number;
      loan_date: string;
      loadn_resource: string;
    }
  ];
}
