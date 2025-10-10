"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestBudget = exports.addItemToBudgetPlan = exports.deleteItemFromBudgetPlan = exports.deleteBudgetPlan = exports.createBudgetPlan = void 0;
const Budget_1 = __importDefault(require("../models/Budget"));
const User_1 = __importDefault(require("../models/User"));
const AppError_1 = __importDefault(require("../utilities/AppError"));
const catchAsync_1 = __importDefault(require("../utilities/catchAsync"));
const constants_1 = require("../utilities/constants");
exports.createBudgetPlan = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id).populate("budget_plan");
    if (!user)
        return next(new AppError_1.default(401, "Please login!"));
    const { month, year, item_list, budget_value } = req.body;
    item_list.forEach((e) => (e.isBought = false));
    // prevent duplicate budget plans
    if (user.budget_plan.some((budget) => budget.month === month && budget.year === year))
        return next(new AppError_1.default(400, `Budget plan already exists for ${constants_1.months[month]} ${year}`));
    if (!item_list || item_list.length === 0)
        return next(new AppError_1.default(400, "Budget plan must contain at least 1 item."));
    const createdBudget = yield Budget_1.default.create({
        month,
        year,
        item_list,
        budget_value,
        budget_owner: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
    });
    user.budget_plan.push(createdBudget.id);
    yield user.save({ validateBeforeSave: false });
    res.status(200).json({
        status: "success",
        message: "Budget created successfully!",
    });
}));
exports.deleteBudgetPlan = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { budgetId } = req.params;
    const currentBudget = yield Budget_1.default.findById(budgetId);
    const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    // Constraint checking
    if (!user)
        return next(new AppError_1.default(401, "Please login!"));
    if (!currentBudget)
        return next(new AppError_1.default(404, "Budget not found!"));
    if (!currentBudget.budget_owner.equals((_b = req.user) === null || _b === void 0 ? void 0 : _b.id))
        return next(new AppError_1.default(401, "You don't have permission to perform this operation"));
    // Finding index of current budget inside users reference collection
    const indexOfBudget = user.budget_plan.findIndex((e) => e.equals(currentBudget.id));
    user.budget_plan.splice(indexOfBudget, 1);
    yield user.save({ validateBeforeSave: false });
    yield Budget_1.default.findByIdAndDelete(budgetId);
    res.status(204).json({});
}));
exports.deleteItemFromBudgetPlan = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { budgetId } = req.params;
    const currentBudget = yield Budget_1.default.findById(budgetId);
    const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    // protection contstraints
    if (!currentBudget)
        return next(new AppError_1.default(404, "Budget not found"));
    if (!user)
        return next(new AppError_1.default(401, "Please login"));
    // permission constraints
    if (!currentBudget.budget_owner.equals(user.id))
        return next(new AppError_1.default(401, "You don't have permission to perform this operation"));
    const { itemsForDelete } = req.body;
    // For each  item on the list first find its index inside array and then splice it
    itemsForDelete.forEach((item) => currentBudget.item_list.splice(currentBudget.item_list.findIndex((e) => e.item_name.toLocaleLowerCase() === item.toLowerCase()), 1));
    yield currentBudget.save({ validateBeforeSave: false });
    res.status(200).json({
        status: "success",
        message: "Item deleted",
    });
}));
exports.addItemToBudgetPlan = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { budgetId } = req.params;
    const currentBudget = yield Budget_1.default.findById(budgetId);
    const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    // protection contstraints
    if (!currentBudget)
        return next(new AppError_1.default(404, "Budget not found"));
    if (!user)
        return next(new AppError_1.default(401, "Please login"));
    // permission constraints
    if (!currentBudget.budget_owner.equals(user.id))
        return next(new AppError_1.default(401, "You don't have permission to perform this operation"));
    const { item_name } = req.body;
    currentBudget.item_list.push({ item_name, isBought: false });
    yield currentBudget.save({ validateBeforeSave: false });
    res.status(200).json({
        status: "success",
        message: "Item added",
    });
}));
exports.getLatestBudget = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id).populate("budget_plan");
    if (!user)
        return next(new AppError_1.default(401, "Please login"));
    const currMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const latestBudget = user.budget_plan.find((e) => e.month === currMonth && e.year === currentYear);
    if (!latestBudget) {
        res.status(200).json({
            status: "fail",
            latest_budget: "not-found",
        });
    }
    else {
        res.status(200).json({
            status: "success",
            latest_budget: latestBudget,
        });
    }
}));
