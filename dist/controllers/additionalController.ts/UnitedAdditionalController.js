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
const Audience_1 = __importDefault(require("../../models/Audience"));
const Department_1 = __importDefault(require("../../models/Department"));
const Faculty_1 = __importDefault(require("../../models/Faculty"));
const Group_1 = __importDefault(require("../../models/Group"));
const Lesson_1 = __importDefault(require("../../models/Lesson"));
const Role_1 = __importDefault(require("../../models/Role"));
class UnitedAdditionalController {
    GetAudiences(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrayAudience = yield Audience_1.default.find({});
            return res.json(arrayAudience);
        });
    }
    GetLessons(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrayLesson = yield Lesson_1.default.find({});
            return res.json(arrayLesson);
        });
    }
    GetFaculties(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrayFaculty = yield Faculty_1.default.find({});
            return res.json(arrayFaculty);
        });
    }
    GetGroups(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrayGroup = yield Group_1.default.find({});
            return res.json(arrayGroup);
        });
    }
    GetDepartments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrayDepartment = yield Department_1.default.find({});
            return res.json(arrayDepartment);
        });
    }
    GetRoles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrayRole = yield Role_1.default.find({});
            return res.json(arrayRole);
        });
    }
}
exports.default = new UnitedAdditionalController();
