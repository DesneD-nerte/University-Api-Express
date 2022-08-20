import ApiError from "../exceptions/apiError";

import User from '../models/User';
import Role from '../models/Role';

import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import config from "../config/config";

import { HydratedDocument, ObjectId, Schema } from "mongoose";
import AuthRepository from "../repositories/authRepository";
import authGenerator from '../services/authGenerator';
import Faculty from "../models/Faculty";
import Group from "../models/Group";
import Department from "../models/Department";
import additionalEntitiesRepository from "../repositories/additionalEntitiesRepository";
import { IDepartment, IFaculty, IGroup, IUser } from "../types/modelsTypes";
import { LoginUserDto } from "../dto/auth/loginUserDto";
import { LoginUserResponseDto } from "../dto/auth/loginUserResponseDto";
import { IRole } from "../types/modelsTypes";
import { IGeneratedProperties } from "../types/servicesTypes/authServicesTypes";
import userRepository from "../repositories/userRepository";

class AuthService {
    async Registration (createUserDto: CreateUserDto) {//roles приходит как ["STUDENT", "TEACHER"]

        const { username, password, name, email, roles } = createUserDto;

        const condidate = await User.findOne({ username });
        
        if(condidate) {
            throw ApiError.BadRequest("Пользователь с таким именем уже есть");
        }

        const hashPassword: string = bcryptjs.hashSync(password, 7);

        const userRolesDocs = await additionalEntitiesRepository.GetDocModel(Role, roles);

        const user = new User({
            username: username,
            password: hashPassword,
            email: email,
            name: name,
            roles: userRolesDocs
        });

        await user.save();

        return user;
    }

    async Login(data: LoginUserDto) {
        const { username, password } = data;

        const user = await AuthRepository.login(username, password);
        if(!user) {
            throw ApiError.BadRequest("Пользователь отсутствует");
        }
        
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(validPassword === false) {
            throw ApiError.BadRequest("Введен неверный логин или пароль");
        }

        const token = this.generateAccessToken(user._id, user.username, user.roles);

        const {_id, roles, email, name, faculties, groups, departments, imageUri} = user;

        return new LoginUserResponseDto(token, _id, username, roles, email, name, faculties, groups, departments, imageUri)
    }

    async RegistrationArray(body: Array<CreateManyUsersDto>) {
        const arrayUsers = body;
        const arrayUsersDataBase: Array<HydratedDocument<IUser>> = [];
        const arrayUsersClientResponse: Array<HydratedDocument<IUser>> = [];

        for (const oneUser of arrayUsers) {
            const existingUser = await userRepository.GetUserByEmail(oneUser.email);
           
            if(existingUser) {
                const userClientResponse: HydratedDocument<IUser> = new User({
                    username: '—',
                    name: oneUser.name, 
                    password: '—', 
                    email: 'Пользователь уже зарегистрирован'
                });
                arrayUsersClientResponse.push(userClientResponse);
                
                continue;
            }

            const { user, userClientResponse } = await this.createUsers(oneUser);

            arrayUsersDataBase.push(user);
            arrayUsersClientResponse.push(userClientResponse);
        }

        const registeredUsers = await User.insertMany(arrayUsersDataBase)

        return arrayUsersClientResponse;
    }

    private async getUserProperties (oneUser: CreateManyUsersDto): Promise<IGeneratedProperties> {
        const generatedUsername = await authGenerator.GenerateLogin(oneUser.name);
        const generatedPassword = authGenerator.GeneratePassword(8)////////////Длина пароля
        const hashPassword = bcryptjs.hashSync(generatedPassword, 7);

        const userRolesDocs: Array<HydratedDocument<IRole>> = await additionalEntitiesRepository.GetDocModel(Role, oneUser.roles);
        const userFacultiesDocs: Array<HydratedDocument<IFaculty>> = await additionalEntitiesRepository.GetDocModel(Faculty, oneUser.faculties);
        const userGroupsDocs: Array<HydratedDocument<IGroup>> = await additionalEntitiesRepository.GetDocModel(Group, oneUser.groups);
        const userDepartmentsDocs: Array<HydratedDocument<IDepartment>> = await additionalEntitiesRepository.GetDocModel(Department, oneUser.departments);

        return {
            generatedUsername,
            generatedPassword,
            hashPassword,
            userRolesDocs,
            userFacultiesDocs,
            userGroupsDocs,
            userDepartmentsDocs,
        }
    }

    private async createUsers (oneUser: CreateManyUsersDto) {
        const generatedProperties = await this.getUserProperties(oneUser);

        const user = await new User({
            username: generatedProperties.generatedUsername,
            name: oneUser.name, 
            password: generatedProperties.hashPassword,
            roles: generatedProperties.userRolesDocs, 
            email: oneUser.email, 
            faculties: generatedProperties.userFacultiesDocs,
            departments: generatedProperties.userDepartmentsDocs,
            groups: generatedProperties.userGroupsDocs
        })

        const userClientResponse = await new User({username: generatedProperties.generatedUsername,
            name: oneUser.name,
            password: generatedProperties.generatedPassword,
            roles: generatedProperties.userRolesDocs,
            email: oneUser.email,
            faculties: generatedProperties.userFacultiesDocs,
            departments: generatedProperties.userDepartmentsDocs,
            groups: generatedProperties.userGroupsDocs
        }).populate(["roles", "faculties", "groups", "departments"]);

        return { user, userClientResponse };
    }

    private generateAccessToken = (id: ObjectId, username: string, roles: Array<ObjectId>) => {
        const payload = {
            _id: id,
            username: username,
            roles: roles
        }
    
        return jwt.sign(payload, config.secret, {algorithm: 'HS512', expiresIn: "24h"});
    }
}

export default new AuthService()