"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const authControllers_1 = __importDefault(require("../controllers/authControllers"));
const { Router } = require('express');
const router = Router();
const authMiddleware = require('../middlewares/authMiddleware');
//  /api/auth
router.post('/registration', [
    (0, express_validator_1.check)('username', "Имя пользователя не может быть пустым").notEmpty(),
    (0, express_validator_1.check)('password', "Пароль должен быть больше 4 символов").isLength({ min: 4 }),
    (0, express_validator_1.check)('email', "").isEmail()
], authControllers_1.default.Registration);
router.post('/registration/arrayusers', authMiddleware, authControllers_1.default.RegistrationArray);
router.post('/login', authControllers_1.default.Login);
module.exports = router;
