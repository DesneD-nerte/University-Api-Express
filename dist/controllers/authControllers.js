"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const apiError_1 = __importDefault(require("../exceptions/apiError"));
const User_1 = __importDefault(require("../models/User"));
const Role_1 = __importDefault(require("../models/Role"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { secret } = require("../config/config");
const dbGetDocEntities_1 = require("../helpers/dbGetDocEntities");
const authRepository_1 = __importDefault(require("../repositories/authRepository"));
const authGenerator_1 = __importDefault(require("../services/authGenerator"));
const Faculty_1 = __importDefault(require("../models/Faculty"));
const Group_1 = __importDefault(require("../models/Group"));
const Department_1 = __importDefault(require("../models/Department"));
const generateAccessToken = (id, username, roles) => {
    const payload = {
        id: id,
        username: username,
        roles: roles
    };
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "24h" });
};
class AuthControllers {
    Registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                //throw ApiError.BadRequest("Неправильно заполнены данные", errors);
                next(apiError_1.default.BadRequest("Неправильно заполнены данные", errors));
            }
            const { username, password, name, email, roles } = req.body;
            const condidate = yield User_1.default.findOne({ username });
            if (condidate) {
                next(apiError_1.default.BadRequest("Пользователь с таким именем уже есть"));
            }
            const hashPassword = bcryptjs_1.default.hashSync(password, 7);
            const userRolesDocs = yield (0, dbGetDocEntities_1.getDocRole)(Role_1.default, roles);
            const user = new User_1.default({
                username: username,
                password: hashPassword,
                email: email,
                name: name,
                roles: userRolesDocs
            });
            yield user.save();
            return res.json({ message: `hello ${username}` });
        });
    }
    Login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const user = yield authRepository_1.default.login(username, password);
            if (!user) {
                return next(apiError_1.default.BadRequest("Пользователь отсутствует")); //Раньше тут не было return, но тогда после next идет выполнение дальше
            }
            const validPassword = bcryptjs_1.default.compareSync(password, user.password);
            if (validPassword === false) {
                return next(apiError_1.default.BadRequest("Введен неверный логин или пароль")); //Раньше тут не было return, но тогда после next идет выполнение дальше
            }
            console.log('Login', user);
            const token = generateAccessToken(user._id, user.username, user.roles);
            const { _id, name, email, roles, imageUri, faculties, departments, groups } = user;
            return res.json({ token, _id, username, name, email, roles, imageUri, faculties, departments, groups });
        });
    }
    RegistrationArray(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrayUsers = req.body;
            const arrayUsersDataBase = [];
            const arrayUsersClientResponse = [];
            for (const oneUser of arrayUsers) {
                const existingUser = yield User_1.default.findOne({ email: oneUser.email });
                if (existingUser) {
                    const userClientResponse = { username: '—', name: oneUser.name, password: '—', roles: ['STUDENT'], email: 'Пользователь уже зарегистрирован' };
                    arrayUsersClientResponse.push(userClientResponse);
                    continue;
                }
                const generatedUsername = yield authGenerator_1.default.generateLogin(oneUser.name);
                console.log('generated', generatedUsername);
                const generatedPassword = authGenerator_1.default.generatePassword(8); ////////////Длина пароля
                const hashPassword = bcryptjs_1.default.hashSync(generatedPassword, 7);
                const userRolesDocs = yield (0, dbGetDocEntities_1.getDocRole)(Role_1.default, oneUser.roles);
                const userFacultiesDocs = yield (0, dbGetDocEntities_1.getDocFaculty)(Faculty_1.default, oneUser.faculties);
                const userGroupsDocs = yield (0, dbGetDocEntities_1.getDocGroup)(Group_1.default, oneUser.groups);
                const userDepartmentsDocs = yield (0, dbGetDocEntities_1.getDocDepartment)(Department_1.default, oneUser.departments);
                const user = new User_1.default({ username: generatedUsername, name: oneUser.name, password: hashPassword, roles: userRolesDocs, email: oneUser.email, faculties: userFacultiesDocs, departments: userDepartmentsDocs, groups: userGroupsDocs });
                const userClientResponse = { username: generatedUsername, name: oneUser.name, password: generatedPassword, roles: userRolesDocs, email: oneUser.email, faculties: userFacultiesDocs, departments: userDepartmentsDocs, groups: userGroupsDocs };
                arrayUsersDataBase.push(user);
                arrayUsersClientResponse.push(userClientResponse);
            }
            console.log(arrayUsersClientResponse);
            User_1.default.insertMany(arrayUsersDataBase)
                .then(docs => res.json(arrayUsersClientResponse))
                .catch(error => console.log('AuthController', error));
        });
    }
}
exports.default = new AuthControllers();
