import ApiError from "../exceptions/apiError";
import {check} from "express-validator";

import lessonController from "../controllers/lessonController";

const {Router} = require('express');
const router = Router();

//  /api/lesson
// router.post('/registration', [
//         check('username', "Имя пользователя не может быть пустым").notEmpty(),
//         check('password', "Пароль должен быть больше 4 символов").isLength({min: 4}),
//         check('email', "").isEmail()
//     ], authController.registration);

router.get('/', lessonController.getCurrentLessons)


module.exports = router;