"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController_1 = require("../controllers/authController");
const loanController_1 = require("../controllers/loanController");
router.use(authController_1.protect);
router.post("/", loanController_1.createLoan);
router.delete("/:loanId", loanController_1.deleteLoan);
router.patch("/:loanId", loanController_1.updateLoan);
exports.default = router;
