"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mark_1 = __importDefault(require("../models/Mark"));
class MarkRepository {
    static getMarks() {
        return __awaiter(this, void 0, void 0, function* () {
            const marks = yield Mark_1.default.find({})
                .populate('lesson')
                .populate('user', { password: 0 })
                .populate({
                path: 'user',
                populate: {
                    path: 'groups',
                    model: 'Group'
                }
            })
                .populate('allCurrentLessons')
                .populate('allCurrentLessons.currentLesson')
                .exec();
            return marks;
        });
    }
    static getAdditionalDataMarksOfOneStudent(_id, lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            const oneStudentMarks = yield Mark_1.default.findOne({ user: _id, lesson: lessonId })
                .populate('allCurrentLessons.currentLesson')
                .exec();
            return oneStudentMarks;
        });
    }
}
exports.default = MarkRepository;
