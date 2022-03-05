import { Schema, model } from 'mongoose';
const mongoose = require('mongoose');

// const UsersSchema = new Schema({
//     _id: { type: Schema.Types.ObjectId, required: true },
//     name: { type: String, required: true },
//     imageUri: { type: String, required: false },
// });

const MessagesSchema = new Schema({
    //_id: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User'}
});

const Chat = new Schema({
    //_id: {type: Schema.Types.ObjectId, required: true},
    users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    messages: [MessagesSchema]
}, {
    collection: 'messages'
});

export default model('Chat', Chat);