import { Schema, model } from 'mongoose';

const User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    imageUri: {type: String, unique: true}
});

export = model('User', User);