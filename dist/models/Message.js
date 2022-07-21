"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
const mongoose = require('mongoose');
;
exports.Message = new mongoose_1.Schema({
    //_id: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }
});
exports.default = (0, mongoose_1.model)("Message", exports.Message);
