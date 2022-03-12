import { Schema, model } from 'mongoose';
const mongoose = require('mongoose');;

export const Message = new Schema({
    //_id: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User'}
});

