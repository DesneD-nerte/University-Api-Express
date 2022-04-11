import { Schema, model } from 'mongoose';

const Audience = new Schema({
    name: {type: String, unique: true, required: true}
});

export = model('Audience', Audience);