import { Schema, model } from 'mongoose';
const { type } = require('os');

const Lesson = new Schema({
    name: { type: String, required: true,},
    teacher: { type: Schema.Types.ObjectId, required: true, ref: 'Teacher' },
    date: {type: Date, required: true},
    begintime: {type: String, required: true},
    endtime: {type: String, required: true},
    classroom: {type: String, required: true}
});

export default model('Lesson', Lesson);