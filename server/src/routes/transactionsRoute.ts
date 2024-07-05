import express from "express";
import { protect } from "../controllers/authController";
import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transactionController";

const router = express.Router();

router.use(protect);

router.route("/").post(createTransaction);
router
  .route("/:transactionId")
  .patch(updateTransaction)
  .delete(deleteTransaction);

export default router;
