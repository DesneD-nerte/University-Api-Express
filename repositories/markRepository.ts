import { ObjectId } from "mongoose";
import ApiError from "../exceptions/apiError";
import CurrentLessons from '../models/CurrentLessons';
import Mark from "../models/Mark";

export default class MarkRepository {

    static async getMarks () {
        const marks = await Mark.find({})
            .populate('lesson')
            .populate('user', {password: 0})
            .populate({
                path: 'user',
                populate: {
                    path: 'groups',
                    model: 'Group'
                }
            })
            .populate('allCurrentLessons')
            .populate('allCurrentLessons.currentLesson')
            .exec()

        return marks;
    }

    static async getAdditionalDataMarksOfOneStudent (_id: ObjectId | string, lessonId: ObjectId | string) {
        const oneStudentMarks = await Mark.findOne({user: _id, lesson: lessonId})
            .populate('allCurrentLessons.currentLesson')
            .exec()

        return oneStudentMarks;
    }
}
