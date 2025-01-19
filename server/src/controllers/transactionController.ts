import { NextFunction, Response } from "express";
import Transaction from "../models/Transaction";
import User from "../models/User";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import AppError from "../utilities/AppError";
import catchAsync from "../utilities/catchAsync";

export const createTransaction = catchAsync(async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const user = await User.findById(req.user?.id);
  if (!user) return next(new AppError(401, "Please login"));

  const { transaction_value, transaction_type, status, source } = req.body;

  if (transaction_value <= 0) return next(new AppError(400, "Transaction value cannot be less or equal to zero"));

  if (transaction_type === "charge" && user.available_balance - transaction_value < 0)
    return next(new AppError(400, "You don't have enough money on your balance to create this transaction."));

  const transaction = await Transaction.create({
    transaction_date: Date.now(),
    transaction_owner: req.user!.id,
    transaction_type,
    transaction_value,
    status,
    source,
  });

  user.transactions.push(transaction.id);
  user.available_balance += transaction_type === "charge" ? -transaction_value : +transaction_value;
  await user?.save({ validateBeforeSave: false });

  res.status(201).json({
    status: "success",
    message: "Transaction successfully created.",
    transaction,
  });
});

const allowedFieldsToBeUpdated = ["transaction_date", "transaction_value", "transaction_type", "status", "source"];

export const updateTransaction = catchAsync(async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const entries = Object.entries(req.body);
  const transaction = await Transaction.findById(req.params.transactionId);

  if (!transaction) return next(new AppError(404, "Transaction not found"));

  entries.forEach((entry) => {
    // prevent unwanted field update
    if (!allowedFieldsToBeUpdated.includes(entry[0])) return;
    (transaction as any)[entry[0]] = entry[1];
  });

  await transaction.save();

  res.status(200).json({
    status: "success",
    message: "Transaction updated",
  });
});

export const deleteTransaction = catchAsync(async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const transaction = await Transaction.findById(req.params.transactionId);
  if (!transaction) return next(new AppError(404, "Transaction not found!"));
  if (!transaction?.transaction_owner.equals(req.user?.id))
    return next(new AppError(401, "You don't have permission to delete this transaction"));

  const user = await User.findById(req.user!.id);
  if (!user) return next(new AppError(401, "Unauthorized"));

  if (transaction.transaction_type === "income") user.available_balance -= transaction.transaction_value;
  if (transaction.transaction_type === "charge") user.available_balance += transaction.transaction_value;
  if (user.available_balance < 0) user.available_balance = 0;

  user.transactions = user.transactions.filter((e) => e.toString() !== transaction.id);
  await user.save({ validateBeforeSave: false });
  await Transaction.findByIdAndDelete(transaction.id);

  res.status(204).json({});
});

export const getCurrentUsersTransactions = catchAsync(async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const transactions = await Transaction.find({
    transaction_owner: req.user?.id,
  }).sort({ transaction_date: -1 });

  res.status(200).json({
    status: "success",
    transactions,
  });
});
