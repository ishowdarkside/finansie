import express from "express";
import { protect } from "../controllers/authController";
import {
  createTransaction,
  deleteTransaction,
  getCurrentUsersTransactions,
  updateTransaction,
} from "../controllers/transactionController";

const router = express.Router();

router.use(protect);

router.route("/").post(createTransaction);
router
  .route("/:transactionId")
  .patch(updateTransaction)
  .delete(deleteTransaction);

router.get("/myTransactions", getCurrentUsersTransactions);

export default router;
