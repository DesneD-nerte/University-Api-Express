import ApiError from "../exceptions/apiError";
import {check} from "express-validator";

import authController from '../controllers/authControllers';

const {Router} = require('express');
const router = Router();

//  /api/auth
router.post('/registration', [
        check('username', "Имя пользователя не может быть пустым").notEmpty(),
        check('password', "Пароль должен быть больше 4 символов").isLength({min: 4}),
        check('email', "").isEmail()
    ], authController.registration);

router.post('/registration/arrayusers', authController.registrationArray)

router.post('/login', authController.login)


module.exports = router;