"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var User = new mongoose_1.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    roles: [{ type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Role' }],
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    imageUri: { type: String },
    faculties: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Faculty' }],
    departments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Department' }],
    groups: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Group' }]
});
exports["default"] = (0, mongoose_1.model)('User', User);
