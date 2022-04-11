import { Schema, model } from 'mongoose';
const mongoose = require('mongoose');

const CurrentLessons = new Schema({
    name: { type: Schema.Types.ObjectId, required: true, ref: 'Lesson' },
    teacher: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    beginDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    classroom: { type: Schema.Types.ObjectId, required: true, ref: 'Audience' },
    group: { type: Schema.Types.ObjectId, required: true, ref: 'Group' }
    //missedstudents: [UserSchema]
}, {
    collection: 'currentLessons'
});

export default model('CurrentLessons', CurrentLessons);