import { Request, Response, NextFunction } from "express";
import AppError from "../utilities/AppError";

const errorController = function (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (process.env.NODE_ENV === "dev") {
    return res.json({
      message: error.message,
      error,
      stack: error.stack,
    });
  }

  if (process.env.NODE_ENV === "production") {
    // malformed jwt handlnig
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized",
      });
    }

    //duplicate entries error handling
    if (error.code && error.code === 11000) {
      const [[key, value]] = Object.entries(error.keyValue);

      return res.status(400).json({
        status: "fail",
        message: `${key} '${value}' already in use!`,
      });
    }

    //validation error handling
    if (error.errors) {
      const errors = Object.values(error.errors).map((e: any) => e.message);

      return res.status(400).json({
        status: "fail",
        errors,
      });
    }

    if (error.getIsOperational?.()) {
      // IF ERROR IS OPERATIONAL
      return res.status(error.getStatusCode()).json({
        status: "fail",
        message: error.message,
      });
    }

    // GENERIC RESPOSNE
    res.status(500).json({
      status: "error",
      message: "Something went really wrong",
    });
  }
};

export default errorController;
