export interface SavingType {
  saving_date: Date;
  saving_value: number;
  saving_owner: string;
  _id: string;
  source: string;
  status: "Completed" | "Processing" | "Canceled";
}
