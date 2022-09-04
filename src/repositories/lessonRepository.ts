import { HydratedDocument } from "mongoose";
import CurrentLesson from "../models/CurrentLesson";
import { ICurrentLesson } from "../types/modelsTypes";

class LessonRepository {

	async GetCurrentLessons () {
		const currentLessons = await CurrentLesson.find({})
			.populate("name")
			.populate("teachers", {password: 0})
			.populate("classroom")
			.populate("group")
			.sort({beginDate: 1})
			.exec(); 

		return currentLessons;
	}

	async SaveNewCurrentLesson(newCurrentLessons: HydratedDocument<ICurrentLesson>) {
		const addedCurrentLesson = await (await newCurrentLessons.save()).populate([
			"name", "classroom", "group", "teachers"
		]);

		return addedCurrentLesson;
	}

	async SaveNewArrayCurrentLessons(arrayCurrentLessons: Array<HydratedDocument<ICurrentLesson>>) {
		const addedCurrentLessons = await CurrentLesson.insertMany(arrayCurrentLessons, {
			populate: [
				{path: "name"}, 
				{path: "classroom"},
				{path: "group"},
				{path: "teachers", select: {password: 0}}
			]
		});

		return addedCurrentLessons;
	}

	async UpdateCurrentLesson(newCurrentLesson: HydratedDocument<ICurrentLesson>) {
		const updatedCurrentLesson = await CurrentLesson.findOneAndUpdate({_id: newCurrentLesson._id}, newCurrentLesson);
        
		return updatedCurrentLesson;
	}

	//#region Количество пропущенных занятий 
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
	//#endregion
}

export default new LessonRepository();
