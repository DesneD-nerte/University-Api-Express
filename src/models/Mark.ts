import { Schema, model } from 'mongoose';
const mongoose = require('mongoose');;

const allCurrentLessonsSchema = new Schema({
    currentLesson: {type: Schema.Types.ObjectId, required: true, ref: 'CurrentLesson'},
    mark: {type: String}
})

const Mark = new Schema({
    allCurrentLessons: [{type: allCurrentLessonsSchema}],
    lesson: { type: Schema.Types.ObjectId, required: true, ref: 'Lesson' },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User'}
});

export default model('Mark', Mark);
