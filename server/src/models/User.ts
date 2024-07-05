import mongoose from "mongoose";
import { UserInterface } from "../types/UserTypes";

const UserSchema = new mongoose.Schema<UserInterface>({
  firstName: {
    type: String,
    required: [true, "Please provide first name!"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name!"],
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (val: string) =>
        val.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      message: "Please provide valid email address!",
    },
  },

  password: {
    type: String,
    minlength: [6, "Password must be at least 6 characters!"],
    maxlength: [30, "Password cannot be longer than 30 characters!"],
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (val: string) {
        return val === (this as any).password;
      },
      message: "Passwords are not matching!",
    },
  },
  available_balance: {
    type: Number,
    default: 0,
  },
  saving_balance: {
    type: Number,
    default: 0,
  },
  loan_balance: {
    type: Number,
    default: 0,
  },

  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
  savings: [
    {
      saving_date: String,
      saving_value: Number,
      source: String,
      status: {
        type: String,
        enum: ["completed", "canceled", "processing"],
      },
    },
  ],
  budget_plan: [
    {
      month: String,
      year: Number,
      item_list: [{ value: String, isBought: Boolean }],
    },
  ],

  wishlist: [
    {
      item: String,
      price: Number,
      total_saved: Number,
      priority: {
        type: String,
        enum: ["low", "medium", "high"],
      },
    },
  ],
  loan: [
    {
      laon_reason: String,
      loan_resource: String,
      loan_value: String,
      loan_date: String,
    },
  ],
});

const User = mongoose.model("User", UserSchema);

export default User;
