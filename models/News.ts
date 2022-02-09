import { Schema, model } from 'mongoose';

const News = new Schema({
    name: { type: String, required: true},
    desciption: { type: String, required: true},
    date: {type: Date, required: true}
})

export default model("News", News);