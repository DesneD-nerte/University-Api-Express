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

    static async saveNewCurrentLesson () {
        
    }
}
