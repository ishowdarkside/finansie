import express from "express";
import { protect } from "../controllers/authController";
import {
  addWishlistItem,
  deleteWishlistItem,
  updateSavedMoney,
} from "../controllers/wishlistController";

const router = express.Router();

router.use(protect);

router.post("/", addWishlistItem);
router.delete("/:wishlistItemId", deleteWishlistItem);
router.patch("/:wishlistItemId", updateSavedMoney);

export default router;
