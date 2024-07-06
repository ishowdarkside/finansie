import express from "express";
import { protect } from "../controllers/authController";
import { updateBalance } from "../controllers/balanceController";
const router = express.Router();

router.use(protect);

router.post("/:balance", updateBalance);

export default router;
