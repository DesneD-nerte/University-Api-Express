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
const express_1 = __importDefault(require("express"));
const mongoose = require('mongoose');
const config = require('./config/config');
const authRoter = require('./routes/authRotes');
const oper = (a, b, op) => {
    return op(a * a, b * b);
};
const littleSquare = (a, b) => {
    if (a === b) {
        console.log(true);
        return true;
    }
    console.log(false);
    return false;
};
oper(2, 5, littleSquare);
// const add () => {
// }
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/auth', authRoter);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(config.connectionString);
        app.listen(config.port, () => console.log(`server started on ${config.port} port`));
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
    }
});
start();
