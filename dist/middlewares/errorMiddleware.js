"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("../exceptions/apiError"));
module.exports = function (err, req, res, next) {
    console.log("error from error Middleware", err.message);
    if (err instanceof apiError_1.default) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: "Непридвиденная ошибка" });
};
