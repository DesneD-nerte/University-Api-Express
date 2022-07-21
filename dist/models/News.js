"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const News = new mongoose_1.Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, required: true }
});
exports.default = (0, mongoose_1.model)("News", News);
