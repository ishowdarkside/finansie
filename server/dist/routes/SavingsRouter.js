"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const savingsController_1 = require("../controllers/savingsController");
const router = express_1.default.Router();
router.use(authController_1.protect);
router.get("/", savingsController_1.getMySavings);
router.post("/", savingsController_1.createSaving);
router.patch("/:savingId", savingsController_1.updateSavings);
router.delete("/:savingId", savingsController_1.deleteSaving);
exports.default = router;
