import express, { Express } from "express";
import dotenv from "dotenv";
import UserRouter from "./routes/userRoutes";

dotenv.config();

const app: Express = express();

//routing api
app.use("/api/auth", UserRouter);

// handle unhandled routes
app.use("*", (req, res, next) => {
  res.json({
    status: "fail",
    message: "Route not found!",
  });
});

export default app;
