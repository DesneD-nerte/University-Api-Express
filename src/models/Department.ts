import { Schema, model } from 'mongoose';

const Department = new Schema({
    name: {type: String, unique: true, required: true},
    room: {type: String}
});

export default model('Department', Department);