import { NextFunction, Response } from "express";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import catchAsync from "../utilities/catchAsync";
import AppError from "../utilities/AppError";
import User from "../models/User";

const balanceCollection = [
  "available_balance",
  "saving_balance",
  "loan_balance",
];

type balanceType = "available_balance" | "saving_balance" | "loan_balance";

export const updateBalance = catchAsync(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const { balance } = req.params;
    if (!balanceCollection.includes(balance as balanceType))
      return next(new AppError(400, "Invalid balance type"));

    const { payload } = req.body;
    if (!payload) return next(new AppError(400, "Please provide payload"));
    const user = await User.findById(req.user?.id);

    if (user) {
      // protect negative balance
      if (user[balance as balanceType] + payload < 0)
        return next(new AppError(400, "Balance cannot be less than 0"));

      user[balance as balanceType]! += payload;
      await user.save({ validateBeforeSave: false });
      res.status(200).json({
        status: "success",
        message: "Balance updated successfully!",
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Couldn't find user. Please login again!",
      });
    }
  }
);
