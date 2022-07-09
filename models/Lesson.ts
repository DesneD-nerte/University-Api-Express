import { Schema, model } from 'mongoose';

const Lesson = new Schema({
    name: {type: String, unique: true, required: true}
});

export default model('Lesson', Lesson);