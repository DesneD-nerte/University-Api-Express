import { Schema, model } from 'mongoose';

const Faculty = new Schema({
    name: {type: String, unique: true, required: true}
});

export default model('Faculty', Faculty);