import AppError from "../utilities/AppError";
import catchAsync from "../utilities/catchAsync";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import User from "../models/User";
import { NextFunction, Response } from "express";

export const createLoan = catchAsync(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?.id);
    if (!user) return next(new AppError(401, "Please login"));

    const { loan_reason, loan_resource, loan_value, loan_date } = req.body;
    if (!loan_reason || !loan_resource || !loan_value || !loan_date)
      return next(
        new AppError(
          400,
          "Please provide all required fields in order to add loan."
        )
      );

    user.loan_balance += loan_value;
    user.loan.push({
      loan_resource,
      loan_reason,
      loan_value,
      loan_date,
      loan_saved_amount: 0,
    });

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Successfully added loan",
    });
  }
);

export const deleteLoan = catchAsync(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?.id);
    if (!user) return next(new AppError(401, "Please login"));

    const { loanId } = req.params;

    const loanIndex = user.loan.findIndex((e) => e._id?.equals(loanId));
    if (loanIndex === -1) return next(new AppError(404, "Loan not found"));

    //constraint
    if (!user.loan.some((e) => e._id?.equals(loanId)))
      return next(
        new AppError(400, "You don't have permission to perform this operation")
      );

    // return saved amount to available balance and splice array (DELETE LOAN)
    console.log(loanIndex);
    user.available_balance += user.loan[loanIndex].loan_saved_amount;
    user.loan.splice(loanIndex, 1);
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Loan deleted successfully!",
    });
  }
);

export const updateLoan = catchAsync(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?.id);
    if (!user) return next(new AppError(401, "Please login"));

    const { loanId } = req.params;
    const { payload } = req.body;

    //constraint
    if (!user.loan.some((e) => e._id?.equals(loanId)))
      return next(
        new AppError(400, "You don't have permission to perform this operation")
      );

    const loan = user.loan.find((e) => e._id?.equals(loanId));
    if (!loan) return next(new AppError(400, "Loan not found"));
    if (loan?.loan_saved_amount + payload > loan?.loan_value)
      return next(
        new AppError(
          400,
          "Loan saving exceeds loan value, please provide lower payload"
        )
      );

    if (user.available_balance - payload < 0)
      return next(
        new AppError(
          400,
          "You don't have enough avilable balance to afford this loan return"
        )
      );
    user.loan_balance -= payload;
    user.available_balance -= payload;

    loan.loan_saved_amount += payload;
    await user.save({ validateBeforeSave: false });

    const message =
      loan.loan_value === loan.loan_saved_amount
        ? `You have paid off ${loan.loan_reason} loan`
        : `${payload}KM added to  ${loan.loan_reason} loan. ${
            loan.loan_value - loan.loan_saved_amount
          } more to go`;

    res.status(200).json({
      status: "success",
      message,
    });
  }
);
