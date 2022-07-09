import { Schema, model } from 'mongoose';

const Group = new Schema({
    name: {type: String, unique: true, required: true}
});

export default model('Group', Group);