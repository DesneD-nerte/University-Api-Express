import ApiError from "../exceptions/apiError";
import {check} from "express-validator";
import userController from "../controllers/userController";
import Router from "express";
import fileController from "../controllers/fileController";

const router = Router();

//  /api/users/
// router.post('/registration', [
//         check('username', "Имя пользователя не может быть пустым").notEmpty(),
//         check('password', "Пароль должен быть больше 4 символов").isLength({min: 4}),
//         check('email', "").isEmail()
//     ], authController.registration);

router.get('/students/:id', userController.GetStudentById)
router.get('/students', userController.GetStudents);
router.get('/:groupId/students', userController.GetStudentsByGroupId);
//router.get('/studentslessons', userController.getStudentsWithSkippedLessons);

router.get('/teachers', userController.GetTeachers);

router.get('/all', userController.GetAll);

router.get('/:id/avatar/:avatarName', fileController.LoadImage);

//router.get('', UserController.getNameAndRoles)


module.exports = router;