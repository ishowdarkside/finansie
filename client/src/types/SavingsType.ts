export interface SavingType {
  saving_date: Date;
  saving_value: number;
  saving_owner: string;
  source: string;
  status: "Completed" | "Processing" | "Canceled";
}
