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
exports.updateSavings = exports.getMySavings = exports.deleteSaving = exports.createSaving = void 0;
const catchAsync_1 = __importDefault(require("../utilities/catchAsync"));
const AppError_1 = __importDefault(require("../utilities/AppError"));
const User_1 = __importDefault(require("../models/User"));
const Saving_1 = __importDefault(require("../models/Saving"));
exports.createSaving = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { saving_value, source, status } = req.body;
    const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (!user)
        return next(new AppError_1.default(401, "Please login!"));
    // prevent negative balance
    if (user.available_balance - saving_value < 0)
        return next(new AppError_1.default(400, "You don't have enough balance to make this saving"));
    user.available_balance -= saving_value;
    user.saving_balance += saving_value;
    // create saving
    const createdSaving = yield Saving_1.default.create({
        saving_date: new Date(),
        saving_value,
        source,
        status,
        saving_owner: req.user.id,
    });
    //populate to users collection (REFERENCE)
    user.savings.push(createdSaving.id);
    yield user.save({ validateBeforeSave: false });
    res.status(201).json({
        status: "success",
        message: "Saving successfully created!",
    });
}));
exports.deleteSaving = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { savingId } = req.params;
    const currentSaving = yield Saving_1.default.findById(savingId);
    if (!currentSaving)
        return next(new AppError_1.default(404, "Something went wrong"));
    const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (!user)
        return next(new AppError_1.default(401, "Please login!"));
    // permission constraints
    if (!currentSaving.saving_owner.equals(user.id))
        return next(new AppError_1.default(401, "You don't have permission to perform this operation!"));
    user.savings = user.savings.filter((e) => e.toString() !== savingId);
    // return money to available balance
    user.available_balance += Number(currentSaving.saving_value);
    yield user.save({ validateBeforeSave: false });
    yield Saving_1.default.findByIdAndDelete(savingId);
    res.status(204).json({});
}));
exports.getMySavings = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const savings = yield Saving_1.default.find({ saving_owner: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }).sort({
        saving_date: -1,
    });
    res.status(200).json({
        status: "success",
        savings,
    });
}));
exports.updateSavings = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const entries = Object.entries(req.body);
    const saving = yield Saving_1.default.findById(req.params.savingId);
    if (!saving)
        return next(new AppError_1.default(404, "Transaction not found"));
    const allowedFieldsToBeUpdated = ["status", "source"];
    entries.forEach((entry) => {
        // prevent unwanted field update
        if (!allowedFieldsToBeUpdated.includes(entry[0]))
            return;
        saving[entry[0]] = entry[1];
    });
    yield saving.save();
    res.status(200).json({
        status: "success",
        message: "Saving updated",
    });
}));
