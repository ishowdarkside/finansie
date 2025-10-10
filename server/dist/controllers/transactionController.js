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
exports.getCurrentUsersTransactions = exports.deleteTransaction = exports.updateTransaction = exports.createTransaction = void 0;
const Transaction_1 = __importDefault(require("../models/Transaction"));
const User_1 = __importDefault(require("../models/User"));
const AppError_1 = __importDefault(require("../utilities/AppError"));
const catchAsync_1 = __importDefault(require("../utilities/catchAsync"));
exports.createTransaction = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (!user)
        return next(new AppError_1.default(401, "Please login"));
    const { transaction_value, transaction_type, status, source } = req.body;
    if (transaction_value <= 0)
        return next(new AppError_1.default(400, "Transaction value cannot be less or equal to zero"));
    if (transaction_type === "charge" &&
        user.available_balance - transaction_value < 0)
        return next(new AppError_1.default(400, "You don't have enough money on your balance to create this transaction."));
    const transaction = yield Transaction_1.default.create({
        transaction_date: Date.now(),
        transaction_owner: req.user.id,
        transaction_type,
        transaction_value,
        status,
        source,
    });
    user.transactions.push(transaction.id);
    user.available_balance +=
        transaction_type === "charge" ? -transaction_value : +transaction_value;
    yield (user === null || user === void 0 ? void 0 : user.save({ validateBeforeSave: false }));
    res.status(201).json({
        status: "success",
        message: "Transaction successfully created.",
        transaction,
    });
}));
const allowedFieldsToBeUpdated = [
    "transaction_date",
    "transaction_value",
    "transaction_type",
    "status",
    "source",
];
exports.updateTransaction = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const entries = Object.entries(req.body);
    const transaction = yield Transaction_1.default.findById(req.params.transactionId);
    if (!transaction)
        return next(new AppError_1.default(404, "Transaction not found"));
    entries.forEach((entry) => {
        // prevent unwanted field update
        if (!allowedFieldsToBeUpdated.includes(entry[0]))
            return;
        transaction[entry[0]] = entry[1];
    });
    yield transaction.save();
    res.status(200).json({
        status: "success",
        message: "Transaction updated",
    });
}));
exports.deleteTransaction = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const transaction = yield Transaction_1.default.findById(req.params.transactionId);
    if (!transaction)
        return next(new AppError_1.default(404, "Transaction not found!"));
    if (!(transaction === null || transaction === void 0 ? void 0 : transaction.transaction_owner.equals((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)))
        return next(new AppError_1.default(401, "You don't have permission to delete this transaction"));
    const user = yield User_1.default.findById(req.user.id);
    if (!user)
        return next(new AppError_1.default(401, "Unauthorized"));
    if (transaction.transaction_type === "income")
        user.available_balance -= transaction.transaction_value;
    if (user.available_balance < 0)
        user.available_balance = 0;
    user.transactions = user.transactions.filter((e) => e.toString() !== transaction.id);
    yield user.save({ validateBeforeSave: false });
    yield Transaction_1.default.findByIdAndDelete(transaction.id);
    res.status(204).json({});
}));
exports.getCurrentUsersTransactions = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const transactions = yield Transaction_1.default.find({
        transaction_owner: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
    }).sort({ transaction_date: -1 });
    res.status(200).json({
        status: "success",
        transactions,
    });
}));
