"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.protect = exports.login = exports.register = void 0;
const AppError_1 = __importDefault(require("../utilities/AppError"));
const catchAsync_1 = __importDefault(require("../utilities/catchAsync"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.register = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.create(req.body);
    const token = yield jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    res.status(201).json({
        status: "success",
        message: "User created successfully!",
        token,
    });
}));
exports.login = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new AppError_1.default(401, "Please provide email and password!"));
    const user = yield User_1.default.findOne({ email });
    if (!user)
        return next(new AppError_1.default(401, "Please provide valid email and password combination!"));
    const compare = yield bcrypt_1.default.compare(password, user.password);
    if (!compare)
        return next(new AppError_1.default(401, "Please provide valid email and password combination!"));
    const token = yield jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    res.status(200).json({
        status: "success",
        message: "Logged in successfully!",
        token,
    });
}));
exports.protect = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const headersJwt = (_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")) === null || _b === void 0 ? void 0 : _b.at(1);
    if (!headersJwt)
        return next(new AppError_1.default(401, "Unauthorized"));
    const token = yield jsonwebtoken_1.default.verify(headersJwt, process.env.JWT_SECRET);
    const user = yield User_1.default.findById(token.id);
    if (!user)
        return next(new AppError_1.default(401, "Unauthorized"));
    req.user = user;
    next();
}));
exports.getUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const headersJwt = (_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")) === null || _b === void 0 ? void 0 : _b.at(1);
    if (!headersJwt)
        return next(new AppError_1.default(401, "Unauthorized"));
    const token = yield jsonwebtoken_1.default.verify(headersJwt, process.env.JWT_SECRET);
    const user = yield User_1.default.findById(token.id).select("-password");
    if (!user)
        return next(new AppError_1.default(401, "Unauthorized"));
    res.status(200).json({
        status: "success",
        user,
    });
}));
