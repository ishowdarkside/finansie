import { Request, Response, NextFunction } from "express";
import { AuthorizedRequest } from "../types/AuthorizedRequest";

const catchAsync = function (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
