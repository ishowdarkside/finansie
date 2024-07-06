import { Request, Response, NextFunction } from "express";
import AppError from "../utilities/AppError";
import catchAsync from "../utilities/catchAsync";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthorizedRequest } from "../types/AuthorizedRequest";

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create(req.body);

    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "30d",
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully!",
      token,
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new AppError(401, "Please provide email and password!"));

    const user = await User.findOne({ email });
    if (!user)
      return next(
        new AppError(
          401,
          "Please provide valid email and password combination!"
        )
      );

    const compare = await bcrypt.compare(password, user.password);

    if (!compare)
      return next(
        new AppError(
          401,
          "Please provide valid email and password combination!"
        )
      );

    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "30d",
    });

    res.status(200).json({
      status: "success",
      message: "Logged in successfully!",
      token,
    });
  }
);

export const protect = catchAsync(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const headersJwt = req.headers.authorization?.split(" ")?.at(1);
    if (!headersJwt) return next(new AppError(401, "Unauthorized"));

    const token = await jwt.verify(headersJwt, process.env.JWT_SECRET!);

    const user = await User.findById((token as { id: string }).id);
    if (!user) return next(new AppError(401, "Unauthorized"));

    req.user = user;
    next();
  }
);
