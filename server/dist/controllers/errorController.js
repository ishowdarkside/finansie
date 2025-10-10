"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorController = function (error, req, res, next) {
    var _a;
    if (process.env.NODE_ENV === "dev") {
        return res.json({
            message: error.message,
            error,
            stack: error.stack,
        });
    }
    if (process.env.NODE_ENV === "production") {
        // malformed jwt handlnig
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                status: "fail",
                message: "Unauthorized",
            });
        }
        //duplicate entries error handling
        if (error.code && error.code === 11000) {
            const [[key, value]] = Object.entries(error.keyValue);
            return res.status(400).json({
                status: "fail",
                message: `${key} '${value}' already in use!`,
            });
        }
        //validation error handling
        if (error.errors) {
            const errors = Object.values(error.errors).map((e) => e.message);
            return res.status(400).json({
                status: "fail",
                errors,
            });
        }
        if ((_a = error.getIsOperational) === null || _a === void 0 ? void 0 : _a.call(error)) {
            // IF ERROR IS OPERATIONAL
            return res.status(error.getStatusCode()).json({
                status: "fail",
                message: error.message,
            });
        }
        // GENERIC RESPOSNE
        res.status(500).json({
            status: "error",
            message: "Something went really wrong",
        });
    }
};
exports.default = errorController;
