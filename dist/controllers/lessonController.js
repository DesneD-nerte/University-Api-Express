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
const CurrentLessons_1 = __importDefault(require("../models/CurrentLessons"));
const lessonRepository_1 = __importDefault(require("../repositories/lessonRepository"));
class LessonController {
    GetCurrentLessons(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lessons = yield lessonRepository_1.default.getCurrentLessons();
                return res.json(lessons);
            }
            catch (e) {
                console.log(e);
                return res.send(e);
            }
        });
    }
    SaveNewCurrentLesson(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const currentLesson = new CurrentLessons_1.default({
                name: body.lessonNameId,
                teachers: body.teacherId,
                classroom: body.classRoomId,
                beginDate: body.startDate,
                endDate: body.endDate,
                group: body.groupId
            });
            yield currentLesson.save();
            return res.json(currentLesson);
        });
    }
    SaveNewArrayCurrentLessons(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrayBody = req.body;
            console.log(arrayBody);
            const arrayCurrentLessons = [];
            for (const oneCurrentLesson of arrayBody) {
                const currentLesson = new CurrentLessons_1.default({
                    name: oneCurrentLesson.lessonNameId,
                    teachers: oneCurrentLesson.teacherId,
                    classroom: oneCurrentLesson.classRoomId,
                    beginDate: oneCurrentLesson.startDate,
                    endDate: oneCurrentLesson.endDate,
                    group: oneCurrentLesson.groupId
                });
                arrayCurrentLessons.push(currentLesson);
            }
            yield CurrentLessons_1.default.insertMany(arrayCurrentLessons);
            return res.json(arrayCurrentLessons);
        });
    }
    UpdateCurrentLesson(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCurrentLesson = req.body;
            const newCurrentLessons = new CurrentLessons_1.default({
                _id: updatedCurrentLesson._id,
                name: updatedCurrentLesson.lessonNameId,
                teachers: updatedCurrentLesson.teacherId,
                classroom: updatedCurrentLesson.classRoomId,
                beginDate: updatedCurrentLesson.startDate,
                endDate: updatedCurrentLesson.endDate,
                group: updatedCurrentLesson.groupId
            });
            yield CurrentLessons_1.default.findOneAndUpdate({ _id: newCurrentLessons._id }, newCurrentLessons);
            return res.json(updatedCurrentLesson);
        });
    }
    GetSchedulerFormCurrentLessons(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = req.body;
            const result = yield lessonRepository_1.default.getSchedulerCurrentLessons(data);
            return res.json(result);
        });
    }
}
exports.default = new LessonController();
