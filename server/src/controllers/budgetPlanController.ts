import { NextFunction, Response } from "express";
import User from "../models/User";
import Budget from "../models/Budget";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import AppError from "../utilities/AppError";
import catchAsync from "../utilities/catchAsync";
import { BudgetPlanType } from "../types/BudgetPlanType";
import { v4 as uuidv4 } from "uuid";

export const createBudgetPlan = catchAsync(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?.id);
    if (!user) return next(new AppError(401, "Please login!"));
    const { month, year, item_list, budget_value }: BudgetPlanType = req.body;
    const createdBudget = await Budget.create({
      month,
      year,
      item_list,
      budget_value,
    });
    user.budget_plan.push(createdBudget.id);
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Budget created successfully!",
    });
  }
);

export const deleteBudgetPlan = catchAsync(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const { budgetId } = req.params;
    await Budget.findByIdAndDelete(budgetId);

    res.status(204).json({});
  }
);

export const deleteItemFromBudgetPlan = catchAsync(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const { budgetId } = req.params;
    const currentBudget = await Budget.findById(budgetId);
    if (!currentBudget) return next(new AppError(404, "Budget not found"));

    const user = await User.findById(req.user?.id);
    if (!user) return next(new AppError(401, "Please login"));

    // permission constraints
    if (!currentBudget.budget_owner.equals(user.id))
      return next(
        new AppError(401, "You don't have permission to perform this operation")
      );

    const { itemsForDelete } = req.body;

    itemsForDelete.forEach((item: string) =>
      currentBudget.item_list.filter(
        (e) => e.value.toLowerCase() !== item.toLowerCase()
      )
    );

    await currentBudget.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
      message: "Item deleted",
    });
  }
);

export const addItemToBudget = catchAsync(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const { budgetId } = req.params;
    const currentBudget = await Budget.findById(budgetId);
    if (!currentBudget) return next(new AppError(404, "Budget not found"));

    const user = await User.findById(req.user?.id);
    if (!user) return next(new AppError(401, "Please login"));

    // permission constraints
    if (!currentBudget.budget_owner.equals(user.id))
      return next(
        new AppError(401, "You don't have permission to perform this operation")
      );

    const { item_name } = req.body;
    currentBudget.item_list.push({ value: item_name, isBought: false });

    await currentBudget.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
      message: "Item added",
    });
  }
);
