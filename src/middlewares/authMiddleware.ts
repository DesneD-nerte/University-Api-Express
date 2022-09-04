import { Request, Response } from "express";
import ApiError from "../exceptions/apiError";
import { JwtPayload } from "jsonwebtoken";
import config  from "../config/config";

const jwt = require("jsonwebtoken");

export default function (req: Request, res: Response, next: any) {
	try {
		const initialTokenValue: string | undefined = req.headers.authorization?.toString();
		const tokenArr = initialTokenValue?.split(" ");
		let token;

		if(tokenArr && tokenArr.length > 1) {
			token = tokenArr[1];
		} else {
			token = initialTokenValue;
		}

		if(!token) {
			throw ApiError.UnauthorizedError();
		}
        
		jwt.verify(token, config.secret, function(err: Error, decoded: JwtPayload) {
			if(err) {
				throw ApiError.TokenExpired();
			}

			if(req.baseUrl === "/myprofile") {
				req.body.user = decoded;
			}
		});

		next();
	} catch (error) {
		if(error instanceof ApiError) {
			next(error);
		} else {
			console.log(error);
			return res.status(400).json({message: "Необходима повторная авторизация"});
		}
	}
}