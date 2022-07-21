"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose = require('mongoose');
const CurrentLessons = new mongoose_1.Schema({
    name: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Lesson' },
    teachers: [{ type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' }],
    beginDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    classroom: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Audience' },
    group: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Group' }
    //missedstudents: [UserSchema]
}, {
    collection: 'currentLessons'
});
exports.default = (0, mongoose_1.model)('CurrentLessons', CurrentLessons);
