import { Request, Response, NextFunction } from "express";
import { JwtPayload } from 'jsonwebtoken';
import Role from "../models/Role";
import User from '../models/User';
import UserRepository from "../repositories/userRepository";
import {roleTeacherObjectId} from '../databaseLinks';

class UserController {
    async getMyData (req: Request, res: Response, next: NextFunction) {//Здесь мы получаем наш токен
        console.log(req.body.user);

        const usernameFromToken = req.body.user.username;
        
        const myProfileMongo = await UserRepository.getMyData(usernameFromToken);
        
        const {id, username, name, roles, imageUri, faculties, departments, groups} = myProfileMongo;

        return res.json({id, username, name, roles, imageUri, faculties, departments, groups});
    }

    async getStudents(req: Request, res: Response, next: NextFunction) {//Получаю просто всех студентов (нет в header - максимального количества студентов)
        console.log("getStudents method.");

        const limit = Number.parseInt(req.query.limit?.toString()!) || 10; 
        const page = Number.parseInt(req.query.page?.toString()!) || 0; 

        const massiveStudents = await User.find({roles: ["STUDENT"]}, "name email")
        .limit(limit)
        .skip(limit * page);//Если хотим показывать 11-20, нужно скипать первый показанных и переходить на нужную страницу

        return res.json(massiveStudents);
    }

    async getStudentsByGroupId(req: Request, res: Response, next: NextFunction) {
        console.log('getStudentsByGroupId');

        const {groupId} = req.params;

        const arrayStudents = await User.find({groups: [groupId]})

        return res.json(arrayStudents);
    }
    // async getStudentsWithSkippedLessons(req: Request, res: Response, next: NextFunction) {
    //     console.log("getStudentsWithSkippedLessons method.");

    //     const limit = Number.parseInt(req.query.limit?.toString()!) || 10; 
    //     const page = Number.parseInt(req.query.page?.toString()!) || 0; 

    //     const studentsWithCountedLessons = await UserRepository.getMissedLessons(limit, page);

    //     const countStudents = await UserRepository.getCountStudents();

    //     res.setHeader('maxStudents', countStudents[0].count);//Так как всегда возвращается массив нужно поставить нулевой индекс

    //     return res.json(studentsWithCountedLessons);
    // }

    async getStudentById(req: Request, res: Response, next: NextFunction) {
        console.log("getStudentById method.");

        const student = await User.findOne({_id: req.params.id});

        return res.json(student);
    }

    async getTeachers(req: Request, res: Response, next: NextFunction) {
        console.log("getTeachers method.");

        let massiveTeachers = await User.find({roles: {_id: roleTeacherObjectId}}, "_id name email imageUri roles")
            .populate({
                path: 'roles',
                // match: {value: 'TEACHER'}
            })
            .exec()
            console.log(massiveTeachers);

            return res.json(massiveTeachers);
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        console.log('getall Method');
        const users = await User.find({_id: {$nin: [req.query._id]}});

        res.json(users);
    }
}

export default new UserController();