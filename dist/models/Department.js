"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Department = new mongoose_1.Schema({
    name: { type: String, unique: true, required: true },
    room: { type: String }
});
exports.default = (0, mongoose_1.model)('Department', Department);
