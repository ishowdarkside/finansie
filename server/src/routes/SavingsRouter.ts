import express from "express";
import { protect } from "../controllers/authController";
import {
  createSaving,
  deleteSaving,
  getMySavings,
  updateSavings,
} from "../controllers/savingsController";
const router = express.Router();

router.use(protect);

router.get("/", getMySavings);
router.post("/", createSaving);
router.patch("/:savingId", updateSavings);
router.delete("/:savingId", deleteSaving);

export default router;
