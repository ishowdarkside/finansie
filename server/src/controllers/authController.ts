import { Request, Response, NextFunction } from "express";
import AppError from "../utilities/AppError";
import catchAsync from "../utilities/catchAsync";
import User from "../models/User";

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create(req.body);

    res.json({
      status: "success",
      message: "User created successfully!",
    });
  }
);
