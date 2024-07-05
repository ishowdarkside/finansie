import express from "express";
import { register, login, protect } from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/testToken", protect);

export default router;
