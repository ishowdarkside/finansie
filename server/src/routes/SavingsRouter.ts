import express from "express";
import { protect } from "../controllers/authController";
import { createSaving, deleteSaving } from "../controllers/savingsController";
const router = express.Router();

router.use(protect);

router.post("/", createSaving);
router.delete("/:savingId", deleteSaving);

export default router;
