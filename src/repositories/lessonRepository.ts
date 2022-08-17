import mongoose from "mongoose";
import CurrentLesson from '../models/CurrentLesson';

export default class LessonRepository {

    static async getCurrentLessons () {
        const currentLessons = await CurrentLesson.find({})
            .populate('name')
            .populate('teachers', {password: 0})
            .populate('classroom')
            .populate('group')
            .exec(); 

        return currentLessons;
    }

    static async getSchedulerCurrentLessons(currentLessons: any) {

        const arrayId = currentLessons.map((oneId: string) => new mongoose.Types.ObjectId(oneId));

        const schedulerCurrentLessons = await CurrentLesson.find({_id: {$in: arrayId}})
            .populate('name')
            .populate('teachers', {password: 0})
            .populate('classroom')
            .populate('group')
            .exec(); 

        return schedulerCurrentLessons;
    }

    // static async getCountStudents () {
    //     return await User.aggregate([
    //         {
    //             $match: {
    //                 roles: ["STUDENT"]
    //             }
    //         },
    //         {
    //             $count: 'count'
    //         }
    //     ])
    // }

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
}
