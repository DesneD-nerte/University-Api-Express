import ApiError from "../exceptions/apiError";
import User from '../models/User';
import Lesson from "../models/Lesson";

export default class UserRepository {

    static async getCountStudents () {
        return await User.aggregate([
            {
                $match: {
                    roles: ["STUDENT"]
                }
            },
            {
                $count: 'count'
            }
        ])
    }

    static async getMissedLessons(limit: number, page: number) {
        return await Lesson.aggregate([
            {    $lookup: {
                    from: 'users',
                    localField: 'missedstudents.studentId',
                    foreignField: '_id',
                    as: 'missedstudents'
                }
            },
            {
                $project: {
                    "missedstudents": 1
                }
            },
            {
                $unwind: {
                    path: "$missedstudents"
                }
            },
            {
                $group: {
                    _id: "$missedstudents",
                    count: {$sum: 1}
                }
            },
            {
                $limit: limit //Если хотим показывать 11-20, нужно скипать первый показанных и переходить на нужную страницу
            },
            {
                $skip: limit * page
            }
        ])
    }
}
