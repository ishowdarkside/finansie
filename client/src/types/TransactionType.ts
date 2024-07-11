export interface TransactionType {
  transaction_owner: string;
  transaction_date: Date;
  source: string;
  transaction_value: number;
  transaction_type: "income" | "charge";
  _id: string;
  status: "finished" | "processing" | "canceled";
}
