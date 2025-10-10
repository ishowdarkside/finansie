"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const savingsSchema = new mongoose_1.default.Schema({
    saving_owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    saving_value: {
        type: Number,
        required: [true, "Please provide savings value"],
    },
    source: {
        type: String,
        required: [true, "Please provide savings source"],
    },
    status: {
        type: String,
        enum: ["completed", "processing", "canceled"],
    },
    saving_date: {
        type: Date,
    },
});
const Saving = mongoose_1.default.model("Saving", savingsSchema);
exports.default = Saving;
