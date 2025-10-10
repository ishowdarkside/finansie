"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const wishlistController_1 = require("../controllers/wishlistController");
const router = express_1.default.Router();
router.use(authController_1.protect);
router.post("/", wishlistController_1.addWishlistItem);
router.delete("/:wishlistItemId", wishlistController_1.deleteWishlistItem);
router.patch("/topup/:wishlistItemId", wishlistController_1.updateSavedMoney);
router.patch("/:wishlistId", wishlistController_1.updateWishlistItem);
exports.default = router;
