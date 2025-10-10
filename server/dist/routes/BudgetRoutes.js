"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const budgetPlanController_1 = require("../controllers/budgetPlanController");
const router = express_1.default.Router();
router.use(authController_1.protect);
router.route("/").post(budgetPlanController_1.createBudgetPlan);
router.route("/:budgetId").patch(budgetPlanController_1.addItemToBudgetPlan).delete(budgetPlanController_1.deleteBudgetPlan);
router.patch("/addItem/:budgetId", budgetPlanController_1.addItemToBudgetPlan);
router.patch("/deleteItem/:budgetId", budgetPlanController_1.deleteItemFromBudgetPlan);
router.get("/latestBudget", budgetPlanController_1.getLatestBudget);
exports.default = router;
