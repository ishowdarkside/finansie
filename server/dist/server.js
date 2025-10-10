"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 3000;
const connectLink = (_a = process.env.MONGODB_LINK) === null || _a === void 0 ? void 0 : _a.replace("PASSWORD", process.env.CLUSTER_PASSWORD);
mongoose_1.default
    .connect(connectLink)
    .then(() => console.log("Successfully connected to database!"))
    .catch((err) => console.log(err));
app_1.default.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
