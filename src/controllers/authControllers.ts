import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/apiError";
import authService from "../services/authService";

class AuthControllers {
	async Registration (req: Request, res: Response, next: NextFunction) {//roles приходит как ["STUDENT", "TEACHER"]
		try {
			const errors = validationResult(req);

			if(!errors.isEmpty()) {
				return next(ApiError.BadRequest("Неправильно заполнены данные", errors));
			}
			const user = await authService.Registration(req.body);
            
			return res.json({user});
		} catch (err) {
			return next(err);
		}
	}

	async Login(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await authService.Login(req.body);
            
			return res.json(user);
		} catch (err) {
			return next(err);
		}
	}

	async RegistrationArray(req: Request, res: Response, next: NextFunction) {
		try {
			const arrayUsersClientResponse = await authService.RegistrationArray(req.body);

			res.json(arrayUsersClientResponse);
		} catch (err) {
			return next(err);
		}
	}
}

export default new AuthControllers();