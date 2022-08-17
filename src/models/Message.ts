import { Schema, model } from 'mongoose';
const mongoose = require('mongoose');;

export const Message = new Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User'}
});

export default model("Message", Message);
