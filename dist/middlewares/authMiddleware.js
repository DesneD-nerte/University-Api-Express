"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("../exceptions/apiError"));
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');
module.exports = function (req, res, next) {
    var _a;
    try {
        //const token: string | undefined = req.headers.authorization?.split(' ')[1];
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.toString();
        if (!token) {
            throw apiError_1.default.UnauthorizedError();
        }
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                throw apiError_1.default.TokenExpired();
            }
            req.body.user = decoded;
        });
        next();
    }
    catch (error) {
        if (error instanceof apiError_1.default) {
            next(error);
        }
        else {
            console.log(error);
            return res.status(400).json({ message: "Необходима повторная авторизация" });
        }
    }
};
