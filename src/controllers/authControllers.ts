import { Request, Response, NextFunction, response } from "express";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/apiError";

import User from '../models/User';
import Role from '../models/Role';

import { IRole, IUser } from "../types/modelsTypes";

import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import config from "../config/config";

import { HydratedDocument, ObjectId, Schema } from "mongoose";
import AuthRepository from "../repositories/authRepository";
import AuthGenerator from '../services/authGenerator';
import Faculty from "../models/Faculty";
import Group from "../models/Group";
import Department from "../models/Department";
import AdditionalEntitiesRepository from "../repositories/additionalEntitiesRepository";
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
        const arrayUsers = req.body;
        const arrayUsersDataBase: Array<HydratedDocument<IUser>> = [];
        const arrayUsersClientResponse: Array<HydratedDocument<IUser>> = [];

        for (const oneUser of arrayUsers) {
            const existingUser = await User.findOne({email: oneUser.email});
            if(existingUser) {
                const userClientResponse = new User({username: '—', name: oneUser.name, password: '—', roles: ['STUDENT'], email: 'Пользователь уже зарегистрирован'});
                arrayUsersClientResponse.push(userClientResponse);
                
                continue;
            }
            const generatedUsername = await AuthGenerator.generateLogin(oneUser.name);
            const generatedPassword = AuthGenerator.generatePassword(8)////////////Длина пароля
            const hashPassword: string = bcryptjs.hashSync(generatedPassword, 7);

            const userRolesDocs: Array<HydratedDocument<IRole>> = await AdditionalEntitiesRepository.GetDocRole(Role, oneUser.roles);
            const userFacultiesDocs = await AdditionalEntitiesRepository.GetDocFaculty(Faculty, oneUser.faculties);
            const userGroupsDocs = await AdditionalEntitiesRepository.GetDocGroup(Group, oneUser.groups);
            const userDepartmentsDocs = await AdditionalEntitiesRepository.GetDocDepartment(Department, oneUser.departments);

            const user = await new User({username: generatedUsername, name: oneUser.name, password: hashPassword, roles: userRolesDocs, email: oneUser.email, faculties: userFacultiesDocs, departments: userDepartmentsDocs, groups: userGroupsDocs})
            const userClientResponse = await new User({username: generatedUsername, name: oneUser.name, password: generatedPassword, roles: userRolesDocs, email: oneUser.email, faculties: userFacultiesDocs, departments: userDepartmentsDocs, groups: userGroupsDocs}).populate(["roles", "faculties", "groups", "departments"]);
            
            arrayUsersDataBase.push(user);
            arrayUsersClientResponse.push(userClientResponse);
        }
        console.log("arrayUsersClientResponse", arrayUsersClientResponse);

        User.insertMany(arrayUsersDataBase)
            .then(docs => res.json(arrayUsersClientResponse))
            .catch(error => console.log('AuthController', error));
    }
}

export default new AuthControllers();