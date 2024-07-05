import { NextFunction, Request, Response } from "express";
import Transaction from "../models/Transaction";
import catchAsync from "../utilities/catchAsync";
import { AuthorizedRequest } from "../types/AuthorizedRequest";

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

    res.status(201).json({
      status: "success",
      message: "Transaction successfully created.",
      transaction,
    });
  }
);
