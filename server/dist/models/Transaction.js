"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TransactionSchema = new mongoose_1.default.Schema({
    transaction_owner: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    transaction_date: {
        type: Date,
        required: [true, "Please provide transaction date"],
    },
    transaction_value: {
        type: Number,
        required: [true, "Please provide transaction value"],
    },
    transaction_type: {
        type: String,
        enum: ["charge", "income"],
        required: [true, "Please provide transaction type"],
    },
    status: {
        type: String,
        required: [true, "Please define transaction status!"],
        enum: ["completed", "processing", "canceled"],
    },
    source: {
        type: String,
        required: [true, "Please provide transaction source"],
    },
});
const Transaction = mongoose_1.default.model("Transaction", TransactionSchema);
exports.default = Transaction;
