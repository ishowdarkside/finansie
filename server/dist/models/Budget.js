"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BudgetSchema = new mongoose_1.default.Schema({
    budget_owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    budget_value: {
        type: Number,
        required: [true, "Please provide budget value"],
    },
    item_list: [{ item_name: String, isBought: Boolean }],
    month: {
        type: Number,
        required: [true, "Please provide budget month"],
    },
    year: {
        type: Number,
        required: [true, "Please provide budget year"],
    },
});
const Budget = mongoose_1.default.model("Budget", BudgetSchema);
exports.default = Budget;
