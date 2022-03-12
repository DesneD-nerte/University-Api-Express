import { Schema, model } from 'mongoose';
const mongoose = require('mongoose');
import { Message } from './Message';

// const MessagesSchema = new Schema({
//     //_id: { type: Schema.Types.ObjectId, required: true },
//     content: { type: String, required: true },
//     createdAt: { type: Date, required: true },
//     user: { type: Schema.Types.ObjectId, ref: 'User'}
// });

const Chat = new Schema({
    //_id: {type: Schema.Types.ObjectId, required: true},
    users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    messages: [ Message ]
}, {
    collection: 'messages'
});

export default model('Chat', Chat);