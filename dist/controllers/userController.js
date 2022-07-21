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
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const databaseLinks_1 = require("../databaseLinks");
class UserController {
    GetMyData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const usernameFromToken = req.body.user.username;
            const myProfileMongo = yield userRepository_1.default.getMyData(usernameFromToken);
            const { id, username, name, roles, imageUri, faculties, departments, groups } = myProfileMongo;
            return res.json({ id, username, name, roles, imageUri, faculties, departments, groups });
        });
    }
    GetStudents(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getStudents method.");
            const limit = Number.parseInt((_a = req.query.limit) === null || _a === void 0 ? void 0 : _a.toString()) || 10;
            const page = Number.parseInt((_b = req.query.page) === null || _b === void 0 ? void 0 : _b.toString()) || 0;
            const massiveStudents = yield User_1.default.find({ roles: ["STUDENT"] }, "name email")
                .limit(limit)
                .skip(limit * page); //Если хотим показывать 11-20, нужно скипать первый показанных и переходить на нужную страницу
            return res.json(massiveStudents);
        });
    }
    GetStudentsByGroupId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { groupId } = req.params;
            const arrayStudents = yield User_1.default.find({ groups: [groupId] });
            return res.json(arrayStudents);
        });
    }
    // async getStudentsWithSkippedLessons(req: Request, res: Response, next: NextFunction) {
    //     console.log("getStudentsWithSkippedLessons method.");
    //     const limit = Number.parseInt(req.query.limit?.toString()!) || 10; 
    //     const page = Number.parseInt(req.query.page?.toString()!) || 0; 
    //     const studentsWithCountedLessons = await UserRepository.getMissedLessons(limit, page);
    //     const countStudents = await UserRepository.getCountStudents();
    //     res.setHeader('maxStudents', countStudents[0].count);//Так как всегда возвращается массив нужно поставить нулевой индекс
    //     return res.json(studentsWithCountedLessons);
    // }
    GetStudentById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield User_1.default.findOne({ _id: req.params.id });
            return res.json(student);
        });
    }
    GetTeachers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let massiveTeachers = yield User_1.default.find({ roles: { _id: databaseLinks_1.roleTeacherObjectId } }, "_id name email imageUri roles")
                .populate({
                path: 'roles',
                // match: {value: 'TEACHER'}
            })
                .exec();
            return res.json(massiveTeachers);
        });
    }
    GetAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.default.find({ _id: { $nin: [req.query._id] } });
            res.json(users);
        });
    }
}
exports.default = new UserController();
