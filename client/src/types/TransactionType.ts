export interface TransactionType {
  transaction_owner: string;
  transaction_date: Date;
  source: string;
  transaction_value: number;
  transaction_type: "income" | "charge";
  status: "finished" | "processing" | "canceled";
}