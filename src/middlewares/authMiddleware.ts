import { Request, Response } from "express";
import ApiError from "../exceptions/apiError";

import {JwtPayload, verify} from 'jsonwebtoken';
const jwt = require('jsonwebtoken');
const {secret} = require('../config/config');

module.exports = function (req: Request, res: Response, next: any) {
    try {
        //const token: string | undefined = req.headers.authorization?.split(' ')[1];
        const token: string | undefined = req.headers.authorization?.toString();
        if(!token) {
            throw ApiError.UnauthorizedError();
        }
        
        jwt.verify(token, secret, function(err: Error, decoded: JwtPayload) {
            if(err) {
                throw ApiError.TokenExpired();
            }

            req.body.user = decoded;
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