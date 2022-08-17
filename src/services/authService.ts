import ApiError from "../exceptions/apiError";

import User from '../models/User';
import Role from '../models/Role';

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
import { IUser } from "../types/mainTypes";
import { LoginUserDto } from "../dto/auth/loginUserDto";
import { LoginUserResponseDto } from "../dto/auth/loginUserResponseDto";

class AuthService {
    async Registration (createUserDto: CreateUserDto) {//roles приходит как ["STUDENT", "TEACHER"]

        const { username, password, name, email, roles } = createUserDto;

        const condidate = await User.findOne({ username });
        
        if(condidate) {
            throw ApiError.BadRequest("Пользователь с таким именем уже есть");
        }

        const hashPassword: string = bcryptjs.hashSync(password, 7);

        const userRolesDocs = await AdditionalEntitiesRepository.GetDocRole(Role, roles);

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

    // async RegistrationArray(req: Request, res: Response, next: NextFunction) {
    //     const arrayUsers = req.body;
    //     const arrayUsersDataBase: Array<HydratedDocument<IUser>> = [];
    //     const arrayUsersClientResponse: Array<HydratedDocument<IUser>> = [];

    //     for (const oneUser of arrayUsers) {
    //         const existingUser = await User.findOne({email: oneUser.email});
    //         if(existingUser) {
    //             const userClientResponse = new User({username: '—', name: oneUser.name, password: '—', roles: ['STUDENT'], email: 'Пользователь уже зарегистрирован'});
    //             arrayUsersClientResponse.push(userClientResponse);
                
    //             continue;
    //         }
    //         const generatedUsername = await AuthGenerator.generateLogin(oneUser.name);
    //         const generatedPassword = AuthGenerator.generatePassword(8)////////////Длина пароля
    //         const hashPassword: string = bcryptjs.hashSync(generatedPassword, 7);

    //         const userRolesDocs: Array<HydratedDocument<IRole>> = await AdditionalEntitiesRepository.GetDocRole(Role, oneUser.roles);
    //         const userFacultiesDocs = await AdditionalEntitiesRepository.GetDocFaculty(Faculty, oneUser.faculties);
    //         const userGroupsDocs = await AdditionalEntitiesRepository.GetDocGroup(Group, oneUser.groups);
    //         const userDepartmentsDocs = await AdditionalEntitiesRepository.GetDocDepartment(Department, oneUser.departments);

    //         const user = await new User({username: generatedUsername, name: oneUser.name, password: hashPassword, roles: userRolesDocs, email: oneUser.email, faculties: userFacultiesDocs, departments: userDepartmentsDocs, groups: userGroupsDocs})
    //         const userClientResponse = await new User({username: generatedUsername, name: oneUser.name, password: generatedPassword, roles: userRolesDocs, email: oneUser.email, faculties: userFacultiesDocs, departments: userDepartmentsDocs, groups: userGroupsDocs}).populate(["roles", "faculties", "groups", "departments"]);
            
    //         arrayUsersDataBase.push(user);
    //         arrayUsersClientResponse.push(userClientResponse);
    //     }
    //     console.log("arrayUsersClientResponse", arrayUsersClientResponse);

    //     User.insertMany(arrayUsersDataBase)
    //         .then(docs => res.json(arrayUsersClientResponse))
    //         .catch(error => console.log('AuthController', error));
    // }

    private generateAccessToken = (id: ObjectId, username: string, roles: Array<Schema.Types.ObjectId>) => {
        const payload = {
            id: id,
            username: username,
            roles: roles
        }
    
        return jwt.sign(payload, config.secret, {expiresIn: "24h"});
    }
}

export default new AuthService()