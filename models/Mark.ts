import { Schema, model } from 'mongoose';
const mongoose = require('mongoose');;

const allCurrentLessonsSchema = new Schema({
    currentLesson: {type: Schema.Types.ObjectId, required: true, ref: 'CurrentLessons'},
    mark: {type: String}
})

const Mark = new Schema({
    //_id: { type: Schema.Types.ObjectId, required: true },
    allCurrentLessons: [{type: allCurrentLessonsSchema}],
    lesson: { type: Schema.Types.ObjectId, required: true, ref: 'Lesson' },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User'}
});

export = model('Mark', Mark);
