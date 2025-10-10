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
exports.updateBalance = void 0;
const catchAsync_1 = __importDefault(require("../utilities/catchAsync"));
const AppError_1 = __importDefault(require("../utilities/AppError"));
const User_1 = __importDefault(require("../models/User"));
const balanceCollection = [
    "available_balance",
    "saving_balance",
    "loan_balance",
];
exports.updateBalance = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { balance } = req.params;
    if (!balanceCollection.includes(balance))
        return next(new AppError_1.default(400, "Invalid balance type"));
    const { payload } = req.body;
    if (!payload)
        return next(new AppError_1.default(400, "Please provide payload"));
    const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (user) {
        // protect negative balance
        if (user[balance] + payload < 0)
            return next(new AppError_1.default(400, "Balance cannot be less than 0"));
        user[balance] += payload;
        yield user.save({ validateBeforeSave: false });
        res.status(200).json({
            status: "success",
            message: "Balance updated successfully!",
        });
    }
    else {
        res.status(400).json({
            status: "fail",
            message: "Couldn't find user. Please login again!",
        });
    }
}));
