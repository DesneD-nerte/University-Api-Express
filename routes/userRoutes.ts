import ApiError from "../exceptions/apiError";
import {check} from "express-validator";

import authController from '../controllers/authControllers';
import UserController from "../controllers/userController";

const {Router} = require('express');
const router = Router();

//  /api/:username
// router.post('/registration', [
//         check('username', "Имя пользователя не может быть пустым").notEmpty(),
//         check('password', "Пароль должен быть больше 4 символов").isLength({min: 4}),
//         check('email', "").isEmail()
//     ], authController.registration);

router.get('', UserController.getNameAndRoles)


module.exports = router;