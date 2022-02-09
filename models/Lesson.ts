import { Schema, model } from 'mongoose';
const mongoose = require('mongoose');

const UserSchema = new Schema({
    studentId: {type: mongoose.Types.ObjectId, ref: 'User'}
})

const Lesson = new Schema({
    name: { type: String, required: true },
    teacher: { type: Schema.Types.ObjectId, required: true, ref: 'Teacher' },
    begintime: { type: String, required: true },
    endtime: { type: String, required: true },
    classroom: { type: String, required: true },
    missedstudents: [UserSchema]
}, {
    collection: 'currentLessons'
});

export default model('Lesson', Lesson);