import express from "express";
import { protect } from "../controllers/authController";
import {
  createBudgetPlan,
  deleteBudgetPlan,
  addItemToBudgetPlan,
  deleteItemFromBudgetPlan,
  getLatestBudget,
} from "../controllers/budgetPlanController";

const router = express.Router();

router.use(protect);

router.route("/").post(createBudgetPlan);
router.route("/:budgetId").patch(addItemToBudgetPlan).delete(deleteBudgetPlan);
router.patch("/addItem/:budgetId", addItemToBudgetPlan);
router.patch("/deleteItem/:budgetId", deleteItemFromBudgetPlan);
router.get("/latestBudget", getLatestBudget);

export default router;
