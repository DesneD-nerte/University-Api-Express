import { Schema, model } from 'mongoose';

const News = new Schema({
    name: { type: String, required: true},
    content: { type: String, required: true},
    createdAt: {type: Date, required: true}
})

export default model("News", News);