import { NextFunction, Response } from "express";
import Budget from "../models/Budget";
import User from "../models/User";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import { BudgetPlanType } from "../types/BudgetPlanType";
import AppError from "../utilities/AppError";
import catchAsync from "../utilities/catchAsync";
import mongoose from "mongoose";
import { months } from "../utilities/constants";

export const createBudgetPlan = catchAsync(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?.id).populate("budget_plan");
    if (!user) return next(new AppError(401, "Please login!"));
    const { month, year, item_list, budget_value }: BudgetPlanType = req.body;

    item_list.forEach((e) => (e.isBought = false));

    // prevent duplicate budget plans
    if (
      user.budget_plan.some(
        (budget) => budget.month === month && budget.year === year
      )
    )
      return next(
        new AppError(
          400,
          `Budget plan already exists for ${months[month]} ${year}`
        )
      );

    if (!item_list || item_list.length === 0)
      return next(
        new AppError(400, "Budget plan must contain at least 1 item.")
      );

    const createdBudget = await Budget.create({
      month,
      year,
      item_list,
      budget_value,
      budget_owner: req.user?.id,
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

    const currentBudget = await Budget.findById(budgetId);
    const user = await User.findById(req.user?.id);

    // Constraint checking
    if (!user) return next(new AppError(401, "Please login!"));
    if (!currentBudget) return next(new AppError(404, "Budget not found!"));
    if (!currentBudget.budget_owner.equals(req.user?.id))
      return next(
        new AppError(401, "You don't have permission to perform this operation")
      );

    // Finding index of current budget inside users reference collection
    const indexOfBudget = user.budget_plan.findIndex((e) =>
      (e as any).equals(currentBudget.id)
    );

    user.budget_plan.splice(indexOfBudget, 1);
    await user.save({ validateBeforeSave: false });
    await Budget.findByIdAndDelete(budgetId);

    res.status(204).json({});
  }
);

export const deleteItemFromBudgetPlan = catchAsync(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const { budgetId } = req.params;
    const currentBudget = await Budget.findById(budgetId);
    const user = await User.findById(req.user?.id);

    // protection contstraints
    if (!currentBudget) return next(new AppError(404, "Budget not found"));
    if (!user) return next(new AppError(401, "Please login"));

    // permission constraints
    if (!currentBudget.budget_owner.equals(user.id))
      return next(
        new AppError(401, "You don't have permission to perform this operation")
      );

    const { itemsForDelete } = req.body;

    // For each  item on the list first find its index inside array and then splice it
    itemsForDelete.forEach((item: string) =>
      currentBudget.item_list.splice(
        currentBudget.item_list.findIndex(
          (e) => e.item_name.toLocaleLowerCase() === item.toLowerCase()
        ),
        1
      )
    );

    await currentBudget.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
      message: "Item deleted",
    });
  }
);

export const addItemToBudgetPlan = catchAsync(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const { budgetId } = req.params;
    const currentBudget = await Budget.findById(budgetId);
    const user = await User.findById(req.user?.id);

    // protection contstraints
    if (!currentBudget) return next(new AppError(404, "Budget not found"));
    if (!user) return next(new AppError(401, "Please login"));

    // permission constraints
    if (!currentBudget.budget_owner.equals(user.id))
      return next(
        new AppError(401, "You don't have permission to perform this operation")
      );

    const { item_name } = req.body;
    currentBudget.item_list.push({ item_name, isBought: false });

    await currentBudget.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
      message: "Item added",
    });
  }
);

export const getLatestBudget = catchAsync(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?.id).populate("budget_plan");
    if (!user) return next(new AppError(401, "Please login"));

    const currMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const latestBudget = user.budget_plan.find(
      (e) => e.month === currMonth && e.year === currentYear
    );

    if (!latestBudget) {
      res.status(200).json({
        status: "fail",
        latest_budget: "not-found",
      });
    } else {
      res.status(200).json({
        status: "success",
        latest_budget: latestBudget,
      });
    }
  }
);
