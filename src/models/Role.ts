import { Schema, model } from 'mongoose';

const Role = new Schema({
    value: {type: String, unique: true}
});

export default model('Role', Role);