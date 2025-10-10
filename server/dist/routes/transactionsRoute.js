"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const transactionController_1 = require("../controllers/transactionController");
const router = express_1.default.Router();
router.use(authController_1.protect);
router.route("/").post(transactionController_1.createTransaction);
router
    .route("/:transactionId")
    .patch(transactionController_1.updateTransaction)
    .delete(transactionController_1.deleteTransaction);
router.get("/myTransactions", transactionController_1.getCurrentUsersTransactions);
exports.default = router;
