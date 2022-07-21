import { Request, Response, NextFunction, response } from "express";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/apiError";

import User from '../models/User';
import Role from '../models/Role';

import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
const {secret} = require ("../config/config");

import {getDocRole, getDocDepartment, getDocGroup, getDocFaculty} from "../helpers/dbGetDocEntities";
import { ObjectId } from "mongoose";
import AuthRepository from "../repositories/authRepository";
import AuthGenerator from '../services/authGenerator';
import Faculty from "../models/Faculty";
import Group from "../models/Group";
import Department from "../models/Department";

const generateAccessToken = (id: ObjectId, username: string, roles: Array<string>) => {
    const payload = {
        id: id,
        username: username,
        roles: roles
    }

    return jwt.sign(payload, secret, {expiresIn: "24h"});
}

class AuthControllers {
    async Registration (req: Request, res: Response, next: NextFunction) {//roles приходит как ["STUDENT", "TEACHER"]
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            //throw ApiError.BadRequest("Неправильно заполнены данные", errors);
            next(ApiError.BadRequest("Неправильно заполнены данные", errors));
        }

        const {username, password, name, email, roles} = req.body;

        const condidate = await User.findOne({username});
        if(condidate) {
            next(ApiError.BadRequest("Пользователь с таким именем уже есть"));
        }

        const hashPassword: string = bcryptjs.hashSync(password, 7);

        const userRolesDocs = await getDocRole(Role, roles);

        const user = new User({
            username: username,
            password: hashPassword,
            email: email,
            name: name,
            roles: userRolesDocs
        });
        await user.save();
        
        return res.json({message: `hello ${username}`});
    }

    async Login(req: Request, res: Response, next: NextFunction) {
        const {username, password} = req.body;

        const user = await AuthRepository.login(username, password);
        if(!user) {
            return next(ApiError.BadRequest("Пользователь отсутствует"));//Раньше тут не было return, но тогда после next идет выполнение дальше
        }
        
        const validPassword: boolean = bcryptjs.compareSync(password, user.password);
        if(validPassword === false) {
            return next(ApiError.BadRequest("Введен неверный логин или пароль"));//Раньше тут не было return, но тогда после next идет выполнение дальше
        }

        console.log('Login', user);

        const token = generateAccessToken(user._id, user.username, user.roles);
        
        const { _id, name, email, roles, imageUri, faculties, departments, groups } = user;

        return res.json({token, _id, username, name, email, roles, imageUri, faculties, departments, groups});
    }

    async RegistrationArray(req: Request, res: Response, next: NextFunction) {
        const arrayUsers = req.body;
        const arrayUsersDataBase: Array<typeof User> = []; 
        const arrayUsersClientResponse: Array<any> = [];

        for (const oneUser of arrayUsers) {
            const existingUser = await User.findOne({email: oneUser.email});
            if(existingUser) {
                const userClientResponse = {username: '—', name: oneUser.name, password: '—', roles: ['STUDENT'], email: 'Пользователь уже зарегистрирован'};
                arrayUsersClientResponse.push(userClientResponse);
                
                continue;
            }
            const generatedUsername = await AuthGenerator.generateLogin(oneUser.name);
            console.log('generated', generatedUsername);
            const generatedPassword = AuthGenerator.generatePassword(8)////////////Длина пароля
            const hashPassword: string = bcryptjs.hashSync(generatedPassword, 7);

            const userRolesDocs = await getDocRole(Role, oneUser.roles);
            const userFacultiesDocs = await getDocFaculty(Faculty, oneUser.faculties);
            const userGroupsDocs = await getDocGroup(Group, oneUser.groups);
            const userDepartmentsDocs = await getDocDepartment(Department, oneUser.departments);
            
            const user = new User({username: generatedUsername, name: oneUser.name, password: hashPassword, roles: userRolesDocs, email: oneUser.email, faculties: userFacultiesDocs, departments: userDepartmentsDocs, groups: userGroupsDocs});
            const userClientResponse = {username: generatedUsername, name: oneUser.name, password: generatedPassword, roles: userRolesDocs, email: oneUser.email, faculties: userFacultiesDocs, departments: userDepartmentsDocs, groups: userGroupsDocs};

            arrayUsersDataBase.push(user);
            arrayUsersClientResponse.push(userClientResponse);
        }
        console.log(arrayUsersClientResponse);

        User.insertMany(arrayUsersDataBase)
            .then(docs => res.json(arrayUsersClientResponse))
            .catch(error => console.log('AuthController', error));
    }
}

export default new AuthControllers();