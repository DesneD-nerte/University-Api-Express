import { Request, Response } from "express";
import ApiError from "../exceptions/apiError";

import {JwtPayload, verify} from 'jsonwebtoken';
const {secret} = require('../config/config');

module.exports = function (req: Request, res: Response, next: any) {
    try {
        //const token: string | undefined = req.headers.authorization?.split(' ')[1];
        const token: string | undefined = req.headers.Authorization?.toString();
        if(!token) {
            throw ApiError.UnauthorizedError();
        }

        const decodedData: JwtPayload = verify(token, secret);
        req.body.user = decodedData;

        next();
    } catch (error) {
        if(error instanceof ApiError) {
            next(error);
        } else {
            console.log(error);
            return res.status(400).json({message: "Возможно был исправлен токен"});
        }
    }
}