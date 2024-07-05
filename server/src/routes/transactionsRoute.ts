import express from "express";
import { protect } from "../controllers/authController";
import { createTransaction } from "../controllers/transactionController";

const router = express.Router();

router.use(protect);

router.route("/transactions").post(createTransaction);
