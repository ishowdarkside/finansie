import { NextFunction, Request, Response } from "express";
import Transaction from "../models/Transaction";
import catchAsync from "../utilities/catchAsync";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import User from "../models/User";
import AppError from "../utilities/AppError";
import { TransactionType } from "../types/TransactionType";
import mongoose from "mongoose";

export const createTransaction = catchAsync(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const { transaction_value, transaction_type, status, source } = req.body;

    const transaction = await Transaction.create({
      transaction_date: Date.now(),
      transaction_owner: req.user!.id,
      transaction_type,
      transaction_value,
      status,
      source,
    });

    const user = await User.findById(req.user?.id);
    user?.transactions.push(transaction.id);
    await user?.save({ validateBeforeSave: false });

    res.status(201).json({
      status: "success",
      message: "Transaction successfully created.",
      transaction,
    });
  }
);

const allowedFieldsToBeUpdated = [
  "transaction_date",
  "transaction_value",
  "transaction_type",
  "status",
  "source",
];

export const updateTransaction = catchAsync(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
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
  }
);

export const deleteTransaction = catchAsync(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const transaction = await Transaction.findById(req.params.transactionId);
    if (!transaction) return next(new AppError(404, "Transaction not found!"));
    if (!transaction?.transaction_owner.equals(req.user?.id))
      return next(
        new AppError(
          401,
          "You don't have permission to delete this transaction"
        )
      );

    const user = await User.findById(req.user!.id);
    if (!user) return next(new AppError(401, "Unauthorized"));

    user.transactions = user.transactions.filter(
      (e) => e.toString() !== transaction.id
    );
    await user.save({ validateBeforeSave: false });
    await Transaction.findByIdAndDelete(transaction.id);

    res.status(204).json({});
  }
);
