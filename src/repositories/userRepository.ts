import mongoose from "mongoose";
import User from "../models/User";
import { roleTeacherObjectId, roleStudentObjectId } from "../databaseLinks";

class UserRepository {

	async GetMyData (myId: mongoose.Types.ObjectId) {
		const user = await User.findOne({_id: myId})
			.populate("roles")
			.populate("faculties")
			.populate("departments")
			.populate("groups")
			.exec(); 

		return user;
	}

	async GetStudents(limit: number, page: number) {
		const arrayStudents = await User.find({roles: [roleStudentObjectId]}, "name email imageUri")
			.limit(limit)
			.skip(limit * page);

		return arrayStudents;
	}

	async GetCountStudents () {
		return await User.aggregate([
			{
				$match: {
					roles: ["STUDENT"]
				}
			},
			{
				$count: "count"
			}
		]);
	}

	async GetStudentsByGroupId(groupId: mongoose.Types.ObjectId) {
		const arrayStudents = await User.find({groups: {$in: [groupId]}}, "name email imageUri");

		return arrayStudents;
	}

	async GetUserByEmail(email: string) {
		const user = await User.findOne({email: email}, "name email imageUri");

		return user;
	}

	async GetUserById(_id: mongoose.Types.ObjectId) {
		console.log(_id);
		const user = await User.findById(_id, "name email imageUri");

		return user;
	}

	async GetTeachers() {
		const arrayTeachers = await User.find({roles: {_id: roleTeacherObjectId}}, "_id name email imageUri");
		// .populate({
		//     path: 'roles',
		// })
		// .exec()

		return arrayTeachers;
	}

	async GetAllButMe(_id: mongoose.Types.ObjectId) {
		console.log(_id);
		const arrayUsers = await User.find({_id: {$nin: [_id]}}, "name email imageUri");
		console.log(arrayUsers);

		return arrayUsers;
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
}

export default new UserRepository();
