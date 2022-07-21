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
const User_1 = __importDefault(require("../models/User"));
const markRepository_1 = __importDefault(require("../repositories/markRepository"));
class MarkController {
    GetMarks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const marks = yield markRepository_1.default.getMarks();
                console.log(marks);
                return res.json(marks);
            }
            catch (e) {
                console.log(e);
                return res.send(e);
            }
        });
    }
    SaveNewCurrentLesson(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { appointmentData, newCurrentLesson } = req.body;
            const arrayOneGroupStudents = yield User_1.default.find({ groups: [appointmentData.groupId] });
            for (const oneStudent of arrayOneGroupStudents) {
                const markOneStudent = yield markRepository_1.default.getAdditionalDataMarksOfOneStudent(oneStudent._id, appointmentData.lessonNameId);
                if (markOneStudent) {
                    const currentLessons = markOneStudent.allCurrentLessons;
                    for (let i = currentLessons.length - 1; i >= 0; i--) {
                        if (currentLessons[i].currentLesson.beginDate < new Date(newCurrentLesson.beginDate)) {
                            markOneStudent.allCurrentLessons.splice(i + 1, 0, { currentLesson: newCurrentLesson._id, mark: '' });
                            break;
                        }
                        if (i === 0) {
                            markOneStudent.allCurrentLessons.unshift({ currentLesson: newCurrentLesson._id, mark: '' });
                        }
                    }
                    yield markOneStudent.save();
                }
                else {
                    const newMark = new Mark_1.default({
                        user: oneStudent._id,
                        lesson: appointmentData.lessonNameId,
                        allCurrentLessons: [{ currentLesson: newCurrentLesson._id, mark: '' }]
                    });
                    yield newMark.save();
                }
            }
            return res.sendStatus(200);
        });
    }
    SaveNewArrayCurrentLessons(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { appointmentData, newCurrentLessonsArray } = req.body;
            const arrayOneGroupStudents = yield User_1.default.find({ groups: [appointmentData.groupId] });
            for (const newCurrentLesson of newCurrentLessonsArray) {
                for (const oneStudent of arrayOneGroupStudents) {
                    const markOneStudent = yield markRepository_1.default.getAdditionalDataMarksOfOneStudent(oneStudent._id, appointmentData.lessonNameId);
                    if (markOneStudent) {
                        const currentLessons = markOneStudent.allCurrentLessons;
                        for (let i = currentLessons.length - 1; i >= 0; i--) {
                            if (currentLessons[i].currentLesson.beginDate < new Date(newCurrentLesson.beginDate)) {
                                markOneStudent.allCurrentLessons.splice(i + 1, 0, { currentLesson: newCurrentLesson._id, mark: '' });
                                break;
                            }
                            if (i === 0) {
                                markOneStudent.allCurrentLessons.unshift({ currentLesson: newCurrentLesson._id, mark: '' });
                            }
                        }
                        yield markOneStudent.save();
                    }
                    else {
                        const newMark = new Mark_1.default({
                            user: oneStudent._id,
                            lesson: appointmentData.lessonNameId,
                            allCurrentLessons: [{ currentLesson: newCurrentLesson._id, mark: '' }]
                        });
                        yield newMark.save();
                    }
                }
            }
            return res.sendStatus(200);
        });
    }
    UpdateCurrentLesson(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const existedMark = req.body;
            console.log(existedMark);
            yield Mark_1.default.findOneAndUpdate({ _id: existedMark._id }, { allCurrentLessons: existedMark.allCurrentLessons });
            return res.sendStatus(200);
        });
    }
}
exports.default = new MarkController();
