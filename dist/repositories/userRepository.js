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
const User_1 = __importDefault(require("../models/User"));
class UserRepository {
    static getMyData(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ username: username })
                .populate('roles')
                .populate('faculties')
                .populate('departments')
                .populate('groups')
                .exec();
            return user;
        });
    }
    static getCountStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.aggregate([
                {
                    $match: {
                        roles: ["STUDENT"]
                    }
                },
                {
                    $count: 'count'
                }
            ]);
        });
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
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findById(id);
        });
    }
}
exports.default = UserRepository;
