import mongoose from "mongoose";
import User from '../models/User';

export default class UserRepository {

    static async getMyData (myId: mongoose.Types.ObjectId) {
        const user = await User.findOne({_id: myId})
            .populate('roles')
            .populate('faculties')
            .populate('departments')
            .populate('groups')
            .exec(); 

        return user;
    }

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

    // static async getMissedLessons(limit: number, page: number) {
    //     return await Lesson.aggregate([
    //         {    $lookup: {
    //                 from: 'users',
    //                 localField: 'missedstudents.studentId',
    //                 foreignField: '_id',
    //                 as: 'missedstudents'
    //             }
    //         },
    //         {
    //             $project: {
    //                 "missedstudents": 1
    //             }
    //         },
    //         {
    //             $unwind: {
    //                 path: "$missedstudents"
    //             }
    //         },
    //         {
    //             $group: {
    //                 _id: "$missedstudents",
    //                 count: {$sum: 1}
    //             }
    //         },
    //         {
    //             $limit: limit //Если хотим показывать 11-20, нужно скипать первый показанных и переходить на нужную страницу
    //         },
    //         {
    //             $skip: limit * page
    //         }
    //     ])
    // }

    static async getUserById(id: string) {
        return await User.findById(id);
    }
}
