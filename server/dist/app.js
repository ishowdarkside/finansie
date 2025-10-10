"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const BalanceRouter_1 = __importDefault(require("./routes/BalanceRouter"));
const transactionsRoute_1 = __importDefault(require("./routes/transactionsRoute"));
const SavingsRouter_1 = __importDefault(require("./routes/SavingsRouter"));
const LoanRouter_1 = __importDefault(require("./routes/LoanRouter"));
const BudgetRoutes_1 = __importDefault(require("./routes/BudgetRoutes"));
const wishlistRouter_1 = __importDefault(require("./routes/wishlistRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//cors
app.use((0, cors_1.default)());
/// parse incoming json
app.use(express_1.default.json());
//routing api
app.use("/api/auth", userRoutes_1.default);
app.use("/api/transactions", transactionsRoute_1.default);
app.use("/api/balance", BalanceRouter_1.default);
app.use("/api/savings", SavingsRouter_1.default);
app.use("/api/budget", BudgetRoutes_1.default);
app.use("/api/wishlist", wishlistRouter_1.default);
app.use("/api/loan", LoanRouter_1.default);
app.use(errorController_1.default);
// handle unhandled routes
app.use("*", (req, res, next) => {
    res.json({
        status: "fail",
        message: "Route not found!",
    });
});
exports.default = app;
