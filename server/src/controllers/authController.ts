import { Request, Response, NextFunction } from "express";
import AppError from "../utilities/AppError";
import catchAsync from "../utilities/catchAsync";

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("LELELELE");
  }
);
