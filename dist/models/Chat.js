"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessagesSchema = new mongoose_1.Schema({
    //_id: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    isVisible: { type: Boolean, required: true }
});
const Chat = new mongoose_1.Schema({
    //_id: {type: Schema.Types.ObjectId, required: true},
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: MessagesSchema }],
    // countBadge: {type: Number, required: true}///////////////////////
}, {
    collection: 'messages'
});
exports.default = (0, mongoose_1.model)('Chat', Chat);
