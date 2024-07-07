import express from "express";
const router = express.Router();
import { protect } from "../controllers/authController";
import {
  createLoan,
  deleteLoan,
  updateLoan,
} from "../controllers/loanController";

router.use(protect);

router.post("/", createLoan);
router.delete("/:loanId", deleteLoan);
router.patch("/:loanId", updateLoan);

export default router;
