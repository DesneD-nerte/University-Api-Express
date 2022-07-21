"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../controllers/userController"));
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
// /users/
router.get('/students/:id', userController_1.default.GetStudentById);
router.get('/students', userController_1.default.GetStudents);
router.get('/:groupId/students', userController_1.default.GetStudentsByGroupId);
router.get('/teachers', userController_1.default.GetTeachers);
router.get('/all', userController_1.default.GetAll);
// router.get('/:id/avatar/:avatarName', fileController.LoadImage);
module.exports = router;
