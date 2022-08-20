import { ObjectId } from "mongoose";
import Mark from "../models/Mark";
import { ICurrentLesson } from "../types/modelsTypes";

export class MarkRepository {

    async GetMarks () {
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

    async GetAdditionalDataMarksOfOneStudent (_id: ObjectId | string, lessonId: ObjectId | string) {
        const oneStudentMarks = await Mark.findOne({user: _id, lesson: lessonId})
            .populate<{ allCurrentLessons: {currentLesson: ICurrentLesson, mark: string}[] }>("allCurrentLessons.currentLesson")
            .exec()
            // .populate('allCurrentLessons.currentLesson')

        return oneStudentMarks;
    }
}

export default new MarkRepository();