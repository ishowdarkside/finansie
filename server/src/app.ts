import express, { Express } from "express";
import dotenv from "dotenv";
import UserRouter from "./routes/userRoutes";
import errorController from "./controllers/errorController";

dotenv.config();

const app: Express = express();

/// parse incoming json
app.use(express.json());

//routing api
app.use("/api/auth", UserRouter);

app.use(errorController);

// handle unhandled routes
app.use("*", (req, res, next) => {
  res.json({
    status: "fail",
    message: "Route not found!",
  });
});

export default app;
