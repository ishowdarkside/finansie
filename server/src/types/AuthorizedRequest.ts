import { Request } from "express";
import { UserInterface } from "./UserTypes";

export interface AuthorizedRequest extends Request {
  user?: UserInterface;
}
