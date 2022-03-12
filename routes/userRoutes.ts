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

router.get('/students/:id', userController.getStudentById)
router.get('/students', userController.getStudents);
router.get('/studentslessons', userController.getStudentsWithSkippedLessons);

router.get('/all', userController.getAll);

router.get('/:id/avatar/:avatarName', fileController.LoadImage);

//router.get('', UserController.getNameAndRoles)


module.exports = router;