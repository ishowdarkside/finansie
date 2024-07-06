import catchAsync from "../utilities/catchAsync";
import AppError from "../utilities/AppError";
import User from "../models/User";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import Saving from "../models/Saving";
import { NextFunction, Response } from "express";

export const createSaving = catchAsync(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const { saving_date, saving_value, source, status } = req.body;

    const user = await User.findById(req.user?.id);
    if (!user) return next(new AppError(401, "Please login!"));

    // prevent negative balance
    if (user.available_balance - saving_value < 0)
      return next(
        new AppError(400, "You don't have enough balance to make this saving")
      );

    user.available_balance -= saving_value;

    // create saving
    const createdSaving = await Saving.create({
      saving_date,
      saving_value,
      source,
      status,
      saving_owner: req.user!.id,
    });

    //populate to users collection (REFERENCE)
    user.savings.push(createdSaving.id);
    await user.save({ validateBeforeSave: false });

    res.status(201).json({
      status: "success",
      message: "Saving successfully created!",
    });
  }
);
