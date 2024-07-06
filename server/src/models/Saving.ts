import mongoose from "mongoose";
import { SavingType } from "../types/SavingType";

const savingsSchema = new mongoose.Schema<SavingType>({
  saving_owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  saving_value: {
    type: Number,
    required: [true, "Please provide savings value"],
  },
  source: {
    type: String,
    required: [true, "Please provide savings source"],
  },
  status: {
    type: String,
    enum: ["Completed", "Processing", "Canceled"],
  },
});

const Saving = mongoose.model("Saving", savingsSchema);

export default Saving;
