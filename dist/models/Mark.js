"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose = require('mongoose');
;
const allCurrentLessonsSchema = new mongoose_1.Schema({
    currentLesson: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'CurrentLessons' },
    mark: { type: String }
});
const Mark = new mongoose_1.Schema({
    //_id: { type: Schema.Types.ObjectId, required: true },
    allCurrentLessons: [{ type: allCurrentLessonsSchema }],
    lesson: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Lesson' },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' }
});
exports.default = (0, mongoose_1.model)('Mark', Mark);
