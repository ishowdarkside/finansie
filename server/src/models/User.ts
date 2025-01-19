import mongoose from "mongoose";
import { UserInterface } from "../types/UserTypes";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema<UserInterface>(
  {
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
      required: [true, "Please provide email!"],
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
      required: [true, "Please provide password"],
      minlength: [6, "Password must be at least 6 characters!"],
      maxlength: [30, "Password cannot be longer than 30 characters!"],
    },
    passwordConfirm: {
      required: [true, "Please provide password confirm!"],
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

    transactions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
    ],
    savings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Saving" }],
    budget_plan: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Budget",
      },
    ],

    wishlist: [
      {
        wishlist_item: String,
        price: Number,
        total_saved: Number,
        date_added: Date,
        priority: {
          type: String,
          enum: ["low", "medium", "high"],
        },
      },
    ],
    loan: [
      {
        loan_reason: String,
        loan_resource: String,
        loan_value: Number,
        loan_date: Date,
        loan_saved_amount: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  if (!this.isNew) return next();

  this.passwordConfirm = undefined;
  bcrypt.hash(this.password, 10, (err, encrypted) => {
    this.password = encrypted;
    next();
  });
});

const User = mongoose.model("Users", UserSchema);

export default User;
