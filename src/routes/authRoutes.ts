import {check} from "express-validator";
import authController from "../controllers/authControllers";
import { Router } from "express";

const router = Router();

import authMiddleware from "../middlewares/authMiddleware";

//  /api/auth
router.post("/registration", [
	check("username", "Имя пользователя не может быть пустым").notEmpty(),
	check("password", "Пароль должен быть больше 4 символов").isLength({min: 4}),
	check("email", "").isEmail()
], authController.Registration);

router.post("/registration/arrayusers", authMiddleware, authController.RegistrationArray);

router.post("/login", authController.Login);


export default router;