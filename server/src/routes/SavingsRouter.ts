import express from "express";
import { protect } from "../controllers/authController";
import { createSaving } from "../controllers/savingsController";
const router = express.Router();

router.use(protect);

router.post("/", createSaving);

export default router;
