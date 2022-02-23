import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/apiError";

import User from '../models/User';
import Role from '../models/Role';

import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
const {secret} = require ("../config/config");

import getDocRole from "../helpers/dbGetDocRole";
import { ObjectId } from "mongoose";
import AuthRepository from "../repositories/authRepository";

const generateAccessToken = (id: ObjectId, username: string, roles: Array<string>) => {
    const payload = {
        id: id,
        username: username,
        roles: roles
    }

    return jwt.sign(payload, secret, {expiresIn: "24h"});
}

class AuthControllers {
    async registration (req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            //throw ApiError.BadRequest("Неправильно заполнены данные", errors);
            next(ApiError.BadRequest("Неправильно заполнены данные", errors));
        }

        const {username, password} = req.body;

        const condidate = await User.findOne({username});
        if(condidate) {
            next(ApiError.BadRequest("Пользователь с таким именем уже есть"));
        }

        const hashPassword: string = bcryptjs.hashSync(password, 7);
        const userRoleStudent = await getDocRole(Role, "STUDENT");

        const user = new User({username: username, password: hashPassword, roles: [userRoleStudent.value]});
        await user.save();
        
        return res.json({message: `hello ${username}`});
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const {username, password} = req.body;

        const user = await AuthRepository.login(username, password);//Пока убрал в repository, но там пока мало функций
        if(!user) {
            return next(ApiError.BadRequest("Пользователь отсутствует"));//Раньше тут не было return, но тогда после next идет выполнение дальше
        }
        
        const validPassword: boolean = bcryptjs.compareSync(password, user.password);
        if(validPassword === false) {
            return next(ApiError.BadRequest("Введен неверный пароль"));//Раньше тут не было return, но тогда после next идет выполнение дальше
        }

        const token = generateAccessToken(user._id, user.username, user.roles);
        //Токен - просто строка (string)
        
        return res.json({token});
    }

    async logout (req: Request, res: Response, next: NextFunction) {
        
    }
}

export default new AuthControllers();