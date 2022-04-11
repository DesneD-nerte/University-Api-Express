import { Schema, model } from 'mongoose';

const User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, unique: true, required: true},
    roles: [{type: Schema.Types.ObjectId, required: true, ref: 'Role'}],
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    imageUri: {type: String},
    faculties: [{type: Schema.Types.ObjectId, ref: 'Faculty'}],
    departments: [{type: Schema.Types.ObjectId, ref: 'Department'}],
    groups: [{type: Schema.Types.ObjectId, ref: 'Group'}],
});

export = model('User', User);