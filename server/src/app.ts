import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorController from "./controllers/errorController";
import UserRouter from "./routes/userRoutes";
import BalanceRouter from "./routes/BalanceRouter";
import TransactionRouter from "./routes/transactionsRoute";
import SavingsRouter from "./routes/SavingsRouter";
import LoanRouter from "./routes/LoanRouter";
import BudgetRouter from "./routes/BudgetRoutes";
import WishlistRouter from "./routes/wishlistRouter";

dotenv.config();

const app: Express = express();

//cors
app.use(cors());

/// parse incoming json
app.use(express.json());

//routing api
app.use("/api/auth", UserRouter);
app.use("/api/transactions", TransactionRouter);
app.use("/api/balance", BalanceRouter);
app.use("/api/savings", SavingsRouter);
app.use("/api/budget", BudgetRouter);
app.use("/api/wishlist", WishlistRouter);
app.use("/api/loan", LoanRouter);

app.use(errorController);

// handle unhandled routes
app.use("*", (req, res, next) => {
  res.json({
    status: "fail",
    message: "Route not found!",
  });
});

export default app;
