import express from "express";
import { protect } from "../controllers/authController";
import {
  addWishlistItem,
  deleteWishlistItem,
  updateSavedMoney,
  updateWishlistItem,
} from "../controllers/wishlistController";

const router = express.Router();

router.use(protect);

router.post("/", addWishlistItem);
router.delete("/:wishlistItemId", deleteWishlistItem);
router.patch("/topup/:wishlistItemId", updateSavedMoney);
router.patch("/:wishlistId", updateWishlistItem);

export default router;
