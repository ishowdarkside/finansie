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
exports.updateLoan = exports.deleteLoan = exports.createLoan = void 0;
const AppError_1 = __importDefault(require("../utilities/AppError"));
const catchAsync_1 = __importDefault(require("../utilities/catchAsync"));
const User_1 = __importDefault(require("../models/User"));
exports.createLoan = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (!user)
        return next(new AppError_1.default(401, "Please login"));
    const { loan_reason, loan_resource, loan_value, loan_date } = req.body;
    if (!loan_reason || !loan_resource || !loan_value || !loan_date)
        return next(new AppError_1.default(400, "Please provide all required fields in order to add loan."));
    user.loan_balance += loan_value;
    user.loan.push({
        loan_resource,
        loan_reason,
        loan_value,
        loan_date,
        loan_saved_amount: 0,
    });
    yield user.save({ validateBeforeSave: false });
    res.status(200).json({
        status: "success",
        message: "Successfully added loan",
    });
}));
exports.deleteLoan = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (!user)
        return next(new AppError_1.default(401, "Please login"));
    const { loanId } = req.params;
    const loanIndex = user.loan.findIndex((e) => { var _a; return (_a = e._id) === null || _a === void 0 ? void 0 : _a.equals(loanId); });
    if (loanIndex === -1)
        return next(new AppError_1.default(404, "Loan not found"));
    //constraint
    if (!user.loan.some((e) => { var _a; return (_a = e._id) === null || _a === void 0 ? void 0 : _a.equals(loanId); }))
        return next(new AppError_1.default(400, "You don't have permission to perform this operation"));
    // return saved amount to available balance and splice array (DELETE LOAN)
    console.log(loanIndex);
    user.available_balance += user.loan[loanIndex].loan_saved_amount;
    user.loan.splice(loanIndex, 1);
    yield user.save({ validateBeforeSave: false });
    res.status(200).json({
        status: "success",
        message: "Loan deleted successfully!",
    });
}));
exports.updateLoan = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (!user)
        return next(new AppError_1.default(401, "Please login"));
    const { loanId } = req.params;
    const { payload } = req.body;
    //constraint
    if (!user.loan.some((e) => { var _a; return (_a = e._id) === null || _a === void 0 ? void 0 : _a.equals(loanId); }))
        return next(new AppError_1.default(400, "You don't have permission to perform this operation"));
    const loan = user.loan.find((e) => { var _a; return (_a = e._id) === null || _a === void 0 ? void 0 : _a.equals(loanId); });
    if (!loan)
        return next(new AppError_1.default(400, "Loan not found"));
    if ((loan === null || loan === void 0 ? void 0 : loan.loan_saved_amount) + payload > (loan === null || loan === void 0 ? void 0 : loan.loan_value))
        return next(new AppError_1.default(400, "Loan saving exceeds loan value, please provide lower payload"));
    if (user.available_balance - payload < 0)
        return next(new AppError_1.default(400, "You don't have enough avilable balance to afford this loan return"));
    user.loan_balance -= payload;
    user.available_balance -= payload;
    loan.loan_saved_amount += payload;
    yield user.save({ validateBeforeSave: false });
    const message = loan.loan_value === loan.loan_saved_amount
        ? `You have paid off ${loan.loan_reason} loan`
        : `${payload}KM added to  ${loan.loan_reason} loan. ${loan.loan_value - loan.loan_saved_amount} more to go`;
    res.status(200).json({
        status: "success",
        message,
    });
}));
